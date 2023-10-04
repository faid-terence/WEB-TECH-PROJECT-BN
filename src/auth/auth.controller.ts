import { Body, Controller, Param, Post, Put , UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {Get} from '@nestjs/common'
import { User } from './schema/user.schema';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {AuthGuard} from '@nestjs/passport'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
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

    @Put(':id')
  async updateUserProfile(@Param('id') userId: string, @Body() updateUserDto: UpdateProfileDto): Promise<User> {
    const updatedUser = await this.authService.updateUserProfile(userId, updateUserDto);
    return updatedUser;
  }

  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string){
    return this.authService.verifyUserToken(token)
  }

}
