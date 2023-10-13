import { Resp } from "../types/api-type";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const api = axios.create({});

api.interceptors.response.use(
  (response) => {
    const resp = response as AxiosResponse<Resp<unknown>>;
    if (
      !response.config.headers.isToastDisabled &&
      !response.headers.isToastDisabled &&
      resp?.data.message &&
      !resp.data.error
    ) {
      toast.success(resp.data.message);
    }
    return response;
  },
  function (error) {
    const msg = error?.response?.data?.message;
    if (msg) {
      toast.error(msg);
    }
    return Promise.reject(error);
  }
);

export { api };
