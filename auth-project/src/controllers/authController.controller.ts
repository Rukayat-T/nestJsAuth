import { AuthService } from './../services/AuthService.service';
import { CreateUserDto } from './../dtos/CreateUserDto.dto';
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { BaseResponse } from 'src/Responses/BaseResponse';
import { LoginDto } from 'src/dtos/LoginDto.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/entities/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiBearerAuth()
@Controller("auth")
export class AuthContoller{
    constructor(
        private authService: AuthService
    ){}

    @Post("createUser")
    async createUser(@Body() createUserDto) : Promise<BaseResponse>{
        return await this.authService.register(createUserDto);
    }

    @Post("login")
    async logIn(@Body() loginDto: LoginDto): Promise<{token: string}> {
        return await this.authService.login(loginDto.email, loginDto.password)
    }

    
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get("getAllUsers")
    async getAllUsers(): Promise<BaseResponse>{
            return await this.authService.getAllUsers()
    }
}