import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { FooModule } from '@modules';
import { getContext } from '@libs';

@Module({
  imports: [
    FooModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(__dirname, 'generated/graphql/graphql.ts'),
        outputAs: 'class',
      },
      context: getContext,
    }),
  ],
})
export class AppModule {}
