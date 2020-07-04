// Убираем `?`, т.е. делаем наличие свойства обязательынм (должно быть хотябы { propName: null })
type TConvertToNullable<T> = {
  [Key in keyof T]-?: T[Key] extends NonNullable<infer U>
    ? T[Key]
    : T[Key] | null;
};

export type TGqlTypeGenerator<
  GqlObject,
  ResolveFields extends keyof GqlObject = never
> = {
  flat: TConvertToNullable<Omit<GqlObject, ResolveFields>>;
  flatList: {
    items: TConvertToNullable<Omit<GqlObject, ResolveFields>>[];
    totalCount: number;
  };
  resolveFields: ResolveFields;
  resolver: {
    // FIXME: no any
    // type-coverage:ignore-next-line
    [K in ResolveFields]: (...args: any) => Promise<any>;
  };
};
