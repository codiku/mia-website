interface Response {
  message?: string;
  error?: boolean;
}
export type Resp<T> = Response & T;
