import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from './entities/UserEntity.entity';
import { AuthService } from './services/AuthService.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { AuthContoller } from './controllers/authController.controller';

@Module({
    imports: [
      JwtModule.registerAsync({
        useFactory: () => ({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '3600s' },
        }),
      }),
      TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [AuthService, JwtGuard, JwtStrategy],
    controllers: [AuthContoller],
    exports: [AuthService],
  })
  export class AuthModule {}