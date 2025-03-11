import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { PostCommentRequestDto } from 'modules/board/dto/request';
import { ResponseDto } from 'types/classes';
import { nowDatetime } from 'utils';
import { GetCommentListResultSet } from '../entities/result-set';

@Injectable()
export default class CommentRepository {

    private readonly logger = new Logger('Comment Repository');

    constructor(
        @InjectRepository(CommentEntity)
        private readonly repository: Repository<CommentEntity>,
        private readonly dataSource: DataSource
    ) {}

    create({ content }: PostCommentRequestDto, boardNumber: number, userEmail: string) {
        try {
            const commentEntity = this.repository.create({
                content,
                writeDatetime: nowDatetime,
                userEmail,
                boardNumber
            });
            return commentEntity;
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

    async save(commentEntity: CommentEntity) {
        try {
            return await this.repository.save(commentEntity);
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

    async getCommentList(boardNumber: number) {
        try {
            const resultSets = await this.dataSource
            .createQueryBuilder()
            .select('U.nickname', 'nickname')
            .addSelect('U.profile_image', 'profileImage')
            .addSelect('C.write_datetime', 'writeDatetime')
            .addSelect('C.content', 'content')
            .from('comment', 'C')
            .innerJoin('user', 'U', 'C.user_email = U.email')
            .where('C.board_number = :boardNumber', { boardNumber })
            .orderBy('C.write_datetime', 'DESC')
            .getRawMany();

            return resultSets as GetCommentListResultSet[];

        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

    async deleteByBoardNumber(boardNumber: number) {
        try {
            return await this.repository.delete({ boardNumber });
        } catch (exception) {
            this.logger.error(exception.message);
            ResponseDto.databaseError();
        }
    }

}