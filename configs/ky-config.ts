import { toast } from "sonner";
import ky from "ky";
import { ApiResponse, Resp } from "@/types/api-type";

export const api = ky.extend({
  headers: {
    Accept: "application/json",
  },
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;
        const resp: ApiResponse = await response.clone().json();
        if (resp.error && resp.message) {
          toast.error(resp.message);
        }

        return Promise.reject(error);
      },
    ],

    afterResponse: [
      async (_request, _options, response) => {
        const resp: ApiResponse = await response.clone().json();
        // You could do something with the response, for example, logging.
        if (
          resp.message &&
          !resp.error &&
          _request.headers.get("isToastDisabled") !== "true"
        ) {
          toast.success(resp.message);
        }

        // Or return a `Response` instance to overwrite the response.
        return response;
      },
    ],
  },
});
