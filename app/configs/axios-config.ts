import { Resp } from "@/types/api-type";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({});

api.interceptors.response.use(
  (response) => {
    const resp = response as Resp<unknown>;
    if (resp?.data.message && !resp.data.error) {
      toast.success(resp.data.message);
    }
    return response;
  },
  function (error) {
    const msg = error?.response?.data?.message;
    if (msg) {
      toast.error(msg);
    }
  }
);

export { api };
