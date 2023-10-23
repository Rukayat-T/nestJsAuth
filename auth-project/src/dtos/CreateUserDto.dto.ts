import { IsNumber, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto{

    @IsString()
    @ApiProperty({example: 'John Doe', description: "user's full name", required: true})
    name: string

    @IsString()
    @ApiProperty({example: 'JohnDoe@gmail.com', description: "user's valid email", required: true})
    email: string

    @IsString()
    @ApiProperty({example: '*******', description: "user's valid password", required: true})
    password: string

    @IsNumber()
    @ApiProperty({example: 26, description: "user's age", required: true})
    age: number
}