import ky from "ky";
import { toast } from "sonner";

export const api = ky.extend({
  headers: {
    Accept: "application/json",
  },
});
