import { getServerSession } from "next-auth";
import { ZSAError, createServerActionProcedure } from "zsa";

export const authProcedure = createServerActionProcedure().handler(async ({}) => {
  try {
    const session = await getServerSession();
    console.log("THE session", session);
    if (!session) {
      throw new ZSAError("FORBIDDEN", "User not authenticated");
    }
    return session;
  } catch {
    throw new ZSAError("NOT_FOUND", "Could not get session");
  }
});
