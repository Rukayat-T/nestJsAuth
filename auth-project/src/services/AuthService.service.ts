import { CreateUserDto } from './../dtos/CreateUserDto.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponse } from 'src/Responses/BaseResponse';
import { UserEntity } from "src/entities/UserEntity.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<BaseResponse>{
        try {
            let newUser = new UserEntity()

            newUser = await this.userRepository.save(createUserDto)

            return {
                status: 201,
                message: "successful",
                response: newUser,
            }
            
        } catch (error) {
            return {
                status: 400,
                message: "Bad Request",
                response: error,
            }
        }
        
    }
}