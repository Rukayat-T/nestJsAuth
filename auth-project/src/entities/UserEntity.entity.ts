import { Role } from "src/entities/role.enum";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    age: number

    @Column({type: "enum", enum: Role, default: Role.USER})
    role: Role
}