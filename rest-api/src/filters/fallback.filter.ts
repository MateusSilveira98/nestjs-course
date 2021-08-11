import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.warn(`Fallback EXCEPTION HANDLER TRIGGERED`, JSON.stringify(exception));
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(500).json({
      status: 500,
      createdBy: `FallbackExceptionFilter`,
      errorMessage: exception.message ? exception.message : 'FALHA NO ENGANO!',
    });
  }
}
