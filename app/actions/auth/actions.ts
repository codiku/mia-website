import { getServerSession } from "next-auth";
import { createServerActionProcedure } from "zsa";

export const authProcedure = createServerActionProcedure().handler(async ({}) => {
  try {
    const session = await getServerSession();
    if (!session) {
      throw new Error("User not authenticated");
    }
    return session;
  } catch {
    throw new Error("Could not get session");
  }
});
