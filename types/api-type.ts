export interface ApiResponse {
  message?: string;
  error?: boolean;
}
export type Resp<T> = ApiResponse & T;
