import { CreateUserDto } from './../dtos/CreateUserDto.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponse } from 'src/Responses/BaseResponse';
import { UserEntity } from "src/entities/UserEntity.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Observable, from } from 'rxjs';
import { Role } from 'src/entities/role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<BaseResponse>{
        try {
            let newUser = new UserEntity()

            // newUser = await this.userRepository.save(createUserDto)

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

    hashPassword1 (password: string): Observable<string>{
        const saltRounds = 12
       return from(bcrypt.hash(password, saltRounds));
    }

    async hashPassword (password: string): Promise<string>{
        const saltRounds = 12
       return await bcrypt.hash(password, saltRounds);
    }

    async register(dto: CreateUserDto ): Promise<BaseResponse>{
        try {
            let user = new UserEntity()
            user.age = dto.age
            user.email = dto.email
            user.name = dto.name
            user.role = dto.role

            // if (dto.role == "user"){
            //     user.role = Role.USER
            // }
            // else {
            //     user.role = Role.ADMIN
            // }
           
            if (dto.password1 == dto.password2){
                const hashed = await this.hashPassword(dto.password1)
                user.password = hashed
                const newUser = await this.userRepository.save(user)

                return{
                    status: 200,
                    message: "new user created",
                    response: newUser,
                }
            }
            return{
            status: 401,
            message: "passwords don't match"
            }
        } catch (error) {
            console.log(error)
            return {
                status: 400,
                message: "Bad Request",
                response: error.detail,
            }
            
        }
    }

    async validateUserPassword(password: string, user: UserEntity): Promise<any>{
        if (user){
        return await bcrypt.compare(password, user.password)
    }
    }

    async login(email: string, password: string): Promise<any>{
        const findUser = await this.userRepository.findOne({
            where: {email: email}})

        if(findUser){

        const validate = await this.validateUserPassword(password, findUser)
        if(validate == true){
            const user = {
                id: findUser.id,
                name: findUser.name,
                email: findUser.email,
                age: findUser.age,
                role: findUser.role
            }

            const token = await this.jwtService.signAsync({user})
            return {
            token: token
        }
    }
    }

        return {
            status: 400,
            message: "email is incorrect"
    
    }
}

async getAllUsers(): Promise<BaseResponse>{
    try {

        const users = await this.userRepository.find()
        if (users){
            return {
                status: 200,
                message: "users found",
                response: users
            }
        }
        
    } catch (error) {
        console.log(error)
        return {
            status: 400,
            message: "Bad Request",
            response: error.detail,
        }
        
    }
}
} 