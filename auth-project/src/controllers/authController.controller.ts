import { AuthService } from './../services/AuthService.service';
import { CreateUserDto } from './../dtos/CreateUserDto.dto';
import { Body, Controller, Post } from "@nestjs/common";
import { BaseResponse } from 'src/Responses/BaseResponse';

@Controller("auth")
export class AuthContoller{
    constructor(
        private authService: AuthService
    ){}

    @Post("createUser")
    async createUser(@Body() createUserDto : CreateUserDto) : Promise<BaseResponse>{
        return this.authService.createUser(createUserDto);
    }
}