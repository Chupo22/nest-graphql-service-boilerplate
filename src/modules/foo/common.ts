import * as gql from '@generated/gql';
import { TGqlTypeGenerator } from '@libs';

export type TGqlFooTypes = TGqlTypeGenerator<gql.Foo, 'bar'>;
