import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {
  }
  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp();
    const request = host.getRequest();

    const user = request.user;

    const isAllowed = this.isAllowed(user.roles);

    if (!isAllowed) {
      throw new ForbiddenException();
    }

    return true;
  }

  isAllowed(userRoles: string[]) {
    let allowed = false;
    userRoles.forEach(userRole => {
      if (!allowed && this.allowedRoles.includes(userRole)) {
        allowed = true;
      }
    });

    return allowed;
  }
}
