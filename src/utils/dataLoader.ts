import DataLoader from 'dataloader';

export default (fn: DataLoader.BatchLoadFn<any, any>, options?: DataLoader.Options<any, any>) => {
  return new DataLoader(fn, { cache: true, ...options });
};
