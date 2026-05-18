import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate { 
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];

        if(!authHeader){
            throw new UnauthorizedException("нет токена")
        }

        const [type, token] = authHeader.split(" ");

        if(type !== 'Bearer' || !token){
            throw new UnauthorizedException("неверный формат токена")
        }

        try{
            const payload = this.jwtService.verify(token, {secret: "SUPER_SECRET_JWT"});

            const user = await this.usersService.findByIdWithToken(payload.sub);
            if(!user || user.current_token !== token){
                throw new UnauthorizedException("токен не действителен или пользователь вышел")
            }

            req.user = payload
            return true;
        }catch(e){
            throw new UnauthorizedException("неверный токен")
        }
    }
}