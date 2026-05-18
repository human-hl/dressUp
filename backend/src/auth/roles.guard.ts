import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const ROLES_KAY = 'roles';
export const Roles = (...roles: string[]) => Reflect.metadata(ROLES_KAY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KAY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) return true

        const { user } = context.switchToHttp().getRequest();
        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Нет доступа');
        }

        return true;
    }
}