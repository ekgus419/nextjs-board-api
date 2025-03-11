import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { GetFavoriteListResultSet } from 'modules/data-access/entities/result-set';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';
import { FavoriteListItem } from 'types/interfaces';

export default class GetFavoriteListResponseDto extends ResponseDto {
    
    private favoriteList: FavoriteListItem[];
    
    constructor(
        resultSets: GetFavoriteListResultSet[]
    ) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS)
        const favoriteList: FavoriteListItem[] = resultSets;
        this.favoriteList = favoriteList;
    }

    static success(resultSets: GetFavoriteListResultSet[]) {
        return new GetFavoriteListResponseDto(resultSets);
    }

    static noExistBoard() {
        throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD));
    }

}