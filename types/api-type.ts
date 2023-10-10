import { AxiosResponse } from "axios";

interface Response {
  message?: string;
  error?: boolean;
}
export type Resp<T> = AxiosResponse<Response & T>;
