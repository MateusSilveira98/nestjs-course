import { Injectable, NestMiddleware } from "@nestjs/common";
import { JWT_SECRET } from "../constants";
import * as jwt from 'jsonwebtoken';
@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authJwtToken = req.headers['authorization'];

    if (!authJwtToken) {
      next();
      return;
    }

    try {
      const user = jwt.verify(authJwtToken, JWT_SECRET);
      if (user) {
        req['user'] = user;

      }
    } catch(err) {
      console.log('falha no engano')
    }
    next();
  }
}
