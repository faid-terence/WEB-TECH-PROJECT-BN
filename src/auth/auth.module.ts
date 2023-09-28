import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jqt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn: config.get<string | number>('JWT_EXPIRE')
          }
        }
      }
    }),
    MongooseModule.forFeature([{name:User.name , schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports : [JwtStrategy, PassportModule]
})
export class AuthModule {}
