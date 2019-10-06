export interface IPageInfo {
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  currentPage?: number;
  totalPage?: number;
}
