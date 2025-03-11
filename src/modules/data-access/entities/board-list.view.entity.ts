import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: 'board_list_view'
})
export default class BoardListViewEntity {

    @ViewColumn({
        name: 'board_number'
    })
    boardNumber: number;

    @ViewColumn({
        name: 'title'
    })
    title: string;

    @ViewColumn({
        name: 'content'
    })
    content: string;

    @ViewColumn({
        name: 'title_image'
    })
    boardTitleImage: string | null;
    
    @ViewColumn({
        name: 'view_count'
    })
    viewCount: number;

    @ViewColumn({
        name: 'favorite_count'
    })
    favoriteCount: number;

    @ViewColumn({
        name: 'comment_count'
    })
    commentCount: number;

    @ViewColumn({
        name: 'write_datetime'
    })
    writeDatetime: string;

    @ViewColumn({
        name: 'writer_email'
    })
    writerEmail: string;

    @ViewColumn({
        name: 'writer_nickname'
    })
    writerNickname: string;

    @ViewColumn({
        name: 'writer_profile_image'
    })
    writerProfileImage: string | null;


}