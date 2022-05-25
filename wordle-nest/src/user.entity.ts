import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({default: 0})
    tries: number;

    @Column({default: 0})
    1: number;

    @Column({default: 0})
    2: number;

    @Column({default: 0})
    3: number;

    @Column({default: 0})
    4: number;

    @Column({default: 0})
    5: number;

    @Column({default: 0})
    6: number;

    @Column({default: 0})
    current_streak: number;

    @Column({default: 0})
    max_streak: number;
}