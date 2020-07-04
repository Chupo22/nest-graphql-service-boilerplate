import { Module } from '@nestjs/common';
import { FooResolver } from './resolvers';
import { FooQueriesService } from './foo-queries.service';

@Module({
  providers: [FooQueriesService, FooResolver],
})
export class FooModule {}
