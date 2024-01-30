import { toast } from "sonner";
import ky from "ky";

ky.extend({
  hooks: {
    beforeError: [
      async (error) => {
        const msg = error?.response?.data?.message;
        if (msg) {
          toast.error(msg);
        }
        return Promise.reject(error);
      },
    ],
  },
});

ky.extend({
  hooks: {
    afterResponse: [
      (_request, _options, response) => {
        // You could do something with the response, for example, logging.
        if (
          !response.headers.isToastDisabled &&
          !response.headers.isToastDisabled &&
          response?.data.message &&
          !response.data.error
        ) {
          toast.success(response.data.message);
        }
        // Or return a `Response` instance to overwrite the response.
        return response;
      },
    ],
  },
});
