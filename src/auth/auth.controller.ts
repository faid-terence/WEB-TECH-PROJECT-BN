import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Get} from '@nestjs/common'
import { User } from './schema/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    async getAllUsers () : Promise<User[]>{
        return this.authService.findUsers();
    }

}
