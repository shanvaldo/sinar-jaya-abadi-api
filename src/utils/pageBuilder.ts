import { IPageInfo } from '../interfaces/IPageInfo';

export default (limit: number, offset: number, count: number): IPageInfo => {
  let response = {
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    totalPage: 0,
  };

  if (!+limit && !+offset) {
    return response;
  }

  const totalPage = Math.ceil(count / limit) || 1;
  const currentPage = Math.ceil(offset / limit) + 1 || 1;

  response = {
    currentPage,
    hasNextPage: currentPage < totalPage,
    hasPreviousPage: currentPage > 1,
    totalPage: currentPage < totalPage ? totalPage : currentPage,
  };

  return response;
};
