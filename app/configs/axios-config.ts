import { Resp } from "@/types/api-type";
import axios from "axios";
import { toast } from "sonner";

const axiosDefaults = {};
const api = axios.create(axiosDefaults);
/*
api.interceptors.response.use(
  (response) => {
    const data = response.data as Resp<unknown>;
    if (data.message && !data.error) {
      toast.success(data.message);
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
*/
export { api };
