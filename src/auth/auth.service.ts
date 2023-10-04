import { IsString } from 'class-validator';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt';   
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {JwtService} from '@nestjs/jwt'
import { UpdateProfileDto } from './dto/update-profile.dto';
import { MailService } from 'src/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel : mongoose.Model<User>,
        private jwtServices : JwtService,
        private mailerServices: MailService
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
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Generate a verification token (you can use a library for this)
        const verificationToken = uuidv4();
    
        // Create a new user with the hashed password, isAdmin, and isVerified fields set to false
        const newUser = await this.userModel.create({
          ...user,
          password: hashedPassword,
          isAdmin: false,
          isVerified: false,
          verificationToken
        });
    
        // Send the verification email
        await this.mailerServices.sendUserEmail(user.name, verificationToken, user.email);
    
        return newUser;
      } catch (error) {
        // Handle specific exceptions
        if (error instanceof BadRequestException) {
          throw error;
        } else {
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
      

  async updateUserProfile(userId: string, updateUserDto: UpdateProfileDto): Promise<User> {
    try {
      // Find the user by their ID
      const user = await this.userModel.findById(userId);

      // If the user doesn't exist, throw a NotFoundException
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Update user properties based on the DTO
      if (updateUserDto.name) {
        user.name = updateUserDto.name;
      }

      if (updateUserDto.email) {
        user.email = updateUserDto.email;
      }

      if (updateUserDto.password) {
        // Hash and update the password if provided
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(updateUserDto.password, saltRounds);
        user.password = hashedPassword;
      }

      if (updateUserDto.gender) {
        user.gender = updateUserDto.gender;
      }

      // Save the updated user profile
      const updatedUser = await user.save();

      return updatedUser;
    } catch (error) {
      // Handle any errors, log them, and throw an InternalServerErrorException
      console.error('Error updating user profile:', error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async verifyUserToken(token: string):Promise<User> {
    const user = await this.userModel.findOne({verificationToken: token});
    if(!user) {
      throw new NotFoundException('Invalid verification token');
    }

      // Update the isVerified field to true
      user.isVerified = true;

      await user.save();

      return user;
  }
      
} 