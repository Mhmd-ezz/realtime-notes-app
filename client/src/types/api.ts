export interface BaseResponse<T> {
  data: T;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}
