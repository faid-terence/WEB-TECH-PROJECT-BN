import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from "passport-jwt";
import { Model } from "mongoose";
import { User } from "./schema/user.schema"; // Make sure the path is correct

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload) {
        try {
            const { id } = payload;

            // Find the user in the database using the user ID
            const user = await this.userModel.findById(id);

            if (!user) {
                throw new UnauthorizedException('Login First to access this endpoint');
            }

            return user;
        } catch (error) {
            // Handle any errors that might occur during validation
            throw new UnauthorizedException('Unauthorized');
        }
    }
}
