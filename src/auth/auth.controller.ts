import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Get} from '@nestjs/common'
import { User } from './schema/user.schema';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    async getAllUsers () : Promise<User[]>{
        return this.authService.findUsers();
    }

    @Post('register')
    async registerUser(
        @Body()
        user: RegisterUserDto
    ) : Promise<User> {
        return this.authService.registerUser(user);
    }

    @Post('login')
    async loginUser(
        @Body()
        user: LoginUserDto
    ) : Promise <{token : string}> {
        return this.authService.loginUser(user);
    }
}
