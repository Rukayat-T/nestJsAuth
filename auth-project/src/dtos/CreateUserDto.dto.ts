import { IsNumber, IsString} from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Role } from "src/entities/role.enum"

export class CreateUserDto{

    @IsString()
    @ApiProperty({example: 'John Doe', description: "user's full name", required: true})
    name: string

    @IsString()
    @ApiProperty({example: 'JohnDoe@gmail.com', description: "user's valid email", required: true})
    email: string

    @IsString()
    @ApiProperty({example: '*******', description: "user's valid password", required: true})
    password1: string

    @IsString()
    @ApiProperty({example: '*******', description: "same as password1", required: true})
    password2: string

    @IsNumber()
    @ApiProperty({example: 26, description: "user's age", required: true})
    age: number

    // @IsString()
    @ApiProperty({example: 'USER', description: "user role wither USER or ADMIN", required: true})
    role: Role

}