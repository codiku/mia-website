import { toast } from "sonner";
import { TAnyZodSafeFunctionHandler, ZSAError } from "zsa";
import { useServerAction } from "zsa-react";

export const useAction = (action: TAnyZodSafeFunctionHandler) => {
  return useServerAction(action, {
    onError: (error: any) => {
      toast.error((error.err as ZSAError).message);
    },
  });
};
