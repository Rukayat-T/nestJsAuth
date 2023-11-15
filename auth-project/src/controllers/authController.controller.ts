import { AuthService } from './../services/AuthService.service';
import { CreateUserDto } from './../dtos/CreateUserDto.dto';
import { Body, Controller, Get, Post } from "@nestjs/common";
import { BaseResponse } from 'src/Responses/BaseResponse';
import { LoginDto } from 'src/dtos/LoginDto.dto';

@Controller("auth")
export class AuthContoller{
    constructor(
        private authService: AuthService
    ){}

    @Post("createUser")
    async createUser(@Body() createUserDto : CreateUserDto) : Promise<BaseResponse>{
        return await this.authService.register(createUserDto);
    }

    @Post("login")
    async logIn(@Body() loginDto: LoginDto): Promise<{token: string}> {
        return await this.authService.login(loginDto.email, loginDto.password)
    }

    @Get("getAllUsers")
    async getAllUsers(): Promise<BaseResponse>{
        return await this.authService.getAllUsers()
    }
}