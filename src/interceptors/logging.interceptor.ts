import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TContext } from '@libs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<object>,
  ): Observable<object> {
    const ctx = context.getArgByIndex(2) as TContext;
    const { requestId } = ctx;

    Logger.debug(
      `BEGIN EXECUTION: [request-id: ${requestId}] ${
        context.getHandler().name
      } with ${JSON.stringify(context.getArgByIndex(1))}`,
    );

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.debug(
            `END EXECUTION: [request-id: ${requestId}] ${
              context.getHandler().name
            } in ${Date.now() - now} ms`,
          ),
        ),
      );
  }
}
