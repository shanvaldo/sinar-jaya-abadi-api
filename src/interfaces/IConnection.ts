import { IPageInfo } from './IPageInfo';

export interface IConnection<T> {
  edges: Array<T>;
  pageInfo?: IPageInfo;
  totalCount: number;
}
