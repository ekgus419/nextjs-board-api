import { Injectable } from '@nestjs/common';
import { SearchLogRepository } from 'modules/data-access/repository';
import { GetPopularListResponseDto, GetRelationListResponseDto } from './dto/response';

@Injectable()
export class SearchService {
    constructor(
        private readonly searchLogRepository: SearchLogRepository 
    ) {}

    async getPopularList(): Promise<GetPopularListResponseDto> {
        const resultSets = await this.searchLogRepository.getPopularList();
        return GetPopularListResponseDto.success(resultSets);
    }

    async getRelationList(searchWord: string): Promise<GetRelationListResponseDto> {
        const resultSets = await this.searchLogRepository.getRelationList(searchWord);
        return GetRelationListResponseDto.success(resultSets);
    }
}
