import { v4 as uuid } from 'uuid';

export type TContext = {
  requestId: string;
};

export function getContext(): TContext {
  return { requestId: uuid().toString() };
}
