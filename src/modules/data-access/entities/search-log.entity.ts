import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'search_log'
})
export default class SearchLogEntity {

    @PrimaryGeneratedColumn({
        name: 'sequence'
    })
    sequence: number;

    @Column({
        name: 'search_word'
    })
    searchWord: string;

    @Column({
        name: 'relation_word'
    })
    relationWord: string | null;

    @Column({
        name: 'relation'
    })
    relation: boolean;

}