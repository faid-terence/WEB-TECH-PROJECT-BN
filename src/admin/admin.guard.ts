import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = this.jwtService.verify(token.replace('Bearer ', ''));

      // Check if the user has the 'admin' role (customize this logic as needed)
      if (payload.isAdmin) {
        return true; // User is an admin, allow access
      } else {
        throw new UnauthorizedException('User is not an admin');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
