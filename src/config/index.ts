import { config as dotenvConfig } from 'dotenv';
import { string, type, literal, union, Errors, identity } from 'io-ts';
import { fromNullable } from 'io-ts-types/lib/fromNullable';
import { fold, map } from 'fp-ts/lib/Either';
import { failure } from 'io-ts/lib/PathReporter';
import { pipe } from 'fp-ts/lib/pipeable';
import { NumberFromString } from 'io-ts-types/lib/NumberFromString';

dotenvConfig();

const Env = type(
  {
    NODE_ENV: fromNullable(
      union([literal('development'), literal('test'), literal('production')]),
      'production',
    ),
    HOST: fromNullable(string, 'localhost'),
    PORT: fromNullable(NumberFromString, 4000),
  },
  'TEnv',
);

const env = Env.decode(process.env);

type TEnv = typeof Env._A;

function getAppConfig(env: TEnv) {
  return {
    host: env.HOST,
    port: env.PORT,
    isDevelopment: env.NODE_ENV === 'development',
  };
}

export const appConfig = pipe(
  env,
  map(getAppConfig),
  fold((left: Errors) => {
    throw new Error(failure(left).toString());
  }, identity),
);
