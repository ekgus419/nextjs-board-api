import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'user'
})
export default class UserEntity {

    @PrimaryColumn({
        name: 'email'
    })
    email: string;

    @Column({
        name: 'password'
    })
    password: string;

    @Column({
        name: 'nickname'
    })
    nickname: string;
    
    @Column({
        name: 'tel_number'
    })
    telNumber: string;

    @Column({
        name: 'address'
    })
    address: string;

    @Column({
        name: 'address_detail'
    })
    addressDetail: string | null;

    @Column({
        name: 'profile_image'
    })
    profileImage: string | null;

    @Column({
        name: 'agreed_personal'
    })
    agreedPersonal: boolean;


}