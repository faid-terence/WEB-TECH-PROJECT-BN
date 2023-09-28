import { IsString } from 'class-validator';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt';   
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel : mongoose.Model<User>,
        private jwtServices : JwtService,
    ){}


    async findUsers() : Promise<User[]> {
        const users = await this.userModel.find();

        return users;
    }

    async registerUser(user: RegisterUserDto): Promise<User> {
        const { name, email, password, gender } = user;
      
        if (!name || !email || !password || !gender) {
          throw new BadRequestException('Invalid Inputs!');
        }
      
        try {
          // Check if the user already exists
          const existUser = await this.userModel.findOne({ email });
          if (existUser) {
            throw new BadRequestException('User Already Exists');
          }
      
          // Encrypt the password before saving it
          const saltRounds = 10; // You can adjust the number of rounds as needed
          const hashedPassword = await bcrypt.hash(password, saltRounds);
      
          // Create a new user with the hashed password and isAdmin set to false by default
          const newUser = await this.userModel.create({ ...user, password: hashedPassword, isAdmin: false });
      
          return newUser;
        } catch (error) {
          // Handle specific exceptions
          if (error instanceof BadRequestException) {
            throw error; // Rethrow BadRequestException as-is
          } else {
            // Handle unexpected errors and log them
            console.error('Error during user registration:', error);
            throw new InternalServerErrorException('Internal Server Error');
          }
        }
      }
      async loginUser(user: LoginUserDto) : Promise<{token : string}> {
        const {email, password} = user;
        if(!email || !password) {
            throw new BadRequestException("Please fill in all field");
        }
        const existUser = await this.userModel.findOne({email});
        if(!existUser){
            throw new BadRequestException("Invalid Credentials")
        }
        const passwordMatch = await bcrypt.compare(password, existUser.password);
        if(!passwordMatch){
            throw new BadRequestException("Invalid Credentials");
        }
        const token = this.jwtServices.sign({
            id: existUser._id,
            name: existUser.name,
            isAdmin: existUser.isAdmin
        })
        return {token}
      }
      
}