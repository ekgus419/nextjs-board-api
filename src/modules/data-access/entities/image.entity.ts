import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'image'
})
export default class ImageEntity {

    @PrimaryGeneratedColumn({
        name: 'sequence'
    })
    sequence: number;

    @Column({
        name: 'image'
    })
    image: string;

    @Column({
        name: 'board_number'
    })
    boardNumber: number;
}