import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'favorite'
})
export default class FavoriteEntity {
    @PrimaryColumn({
        name: 'user_email'
    })
    userEmail: string;

    @Column({
        name: 'board_number'
    })
    boardNumber: number;
}