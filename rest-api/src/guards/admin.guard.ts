import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';

@Injectable()
export class AdminGuard extends AuthorizationGuard {
  constructor() {
    super(['ADMIN']);
  }
}
