import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';
import { GetPopularListResponseDto, GetRelationListResponseDto } from './dto/response';

@Controller('/api/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // 인기 검색어 리스트 가져오기
  @Get('/popular-list')
  getPopularList(): Promise<GetPopularListResponseDto> {
    const response = this.searchService.getPopularList();
    return response;
  }

  // 연관 검색어 리스트 가져오기
  @Get('/:searchWord/relation-list')
  getRelationList(@Param('searchWord') searchWord: string): Promise<GetRelationListResponseDto> {
    const response = this.searchService.getRelationList(searchWord);
    return response;
  }

}
