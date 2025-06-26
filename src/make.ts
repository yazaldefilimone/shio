type Loader<TArg, TData> = (arg: TArg) => Promise<TData>;
type KeyFn<TArg> = (arg: TArg) => string;
type TagsFn<TArg> = (arg: TArg) => string[];

export function make<TArg, TData>(opts: { id: KeyFn<TArg>; load: Loader<TArg, TData>; tags?: TagsFn<TArg> }) {
  return {
    key: (arg: TArg) => opts.id(arg),
    load: (arg: TArg) => opts.load(arg),
    tagsFor: (arg: TArg) => (opts.tags ? opts.tags(arg) : []),
  };
}
