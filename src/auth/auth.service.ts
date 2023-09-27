import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import * as mongoose from 'mongoose'
import { async } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel : mongoose.Model<User>
    ){}


    async findUsers() : Promise<User[]> {
        const users = await this.userModel.find();

        return users;
    }
}