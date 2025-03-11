import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchLogEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { ResponseDto } from 'types/classes';
import { GetPopularListResultSet, GetRelationListResultSet } from '../entities/result-set';

@Injectable()
export default class SearchLogRepository {

    private readonly logger = new Logger('SearchLog Repository');

    constructor(
        @InjectRepository(SearchLogEntity)
        private readonly repository: Repository<SearchLogEntity>,
        private readonly dataSource: DataSource
    ) {}

    create(searchWord: string, relationWord: string | null, relation: boolean) {
        try {

            const searchLogEntity = this.repository.create({
                searchWord,
                relationWord,
                relation: relation
            })
            return searchLogEntity;
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

    async save(searchLogEntity: SearchLogEntity) {
        try {
            return await this.repository.save(searchLogEntity);
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

    async getPopularList() {
        try {
            const resultSets = await this.dataSource
            .createQueryBuilder()
            .select('S.search_word', 'searchWord')
            .addSelect('COUNT(S.searchWord)', 'count')
            .from('search_log', 'S')
            .where('S.relation = :relation', { relation: false })
            .groupBy('searchWord')
            .orderBy('count', 'DESC')
            .limit(15)
            .getRawMany();

            return resultSets as GetPopularListResultSet[];
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

    async getRelationList(searchWord: string) {
        try {
            const resultSets = await this.dataSource
            .createQueryBuilder()
            .select('S.relation_word', 'relationWord')
            .addSelect('COUNT(S.relationWord)', 'count')
            .from('search_log', 'S')
            .where('S.search_word = :searchWord', { searchWord })
            .andWhere('S.relation_word IS NOT NULL')
            .groupBy('relationWord')
            .orderBy('count', 'DESC')
            .limit(15)
            .getRawMany();

            return resultSets as GetRelationListResultSet[];
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

}