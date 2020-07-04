import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { TGqlFooTypes } from './common';

@Injectable()
export class FooQueriesService {
  @Query()
  getFoo(): TGqlFooTypes['flat'] {
    return { foo: 'foo' };
  }
}
