import * as gql from '@generated/gql';
import { Resolver, ResolveProperty } from '@nestjs/graphql';
import { TGqlFooTypes } from '../common';

type Resolver = TGqlFooTypes['resolver'];

@Resolver(gql.Foo)
export class FooResolver implements Resolver {
  @ResolveProperty()
  async bar() {
    return 123;
  }
}
