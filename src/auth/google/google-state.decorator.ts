import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GoogleState as TGoogleState } from 'src/types/oauth';

export const GoogleState = createParamDecorator(
  (data: keyof TGoogleState | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!data) return request?.googleState ?? {};

    return request?.googleState?.[data] ?? '';
  },
);
