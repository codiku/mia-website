export { default } from "next-auth/middleware";

// Defined all the routes that are protected (you can use regexp)
export const config = { matcher: ["/auth/account"] };
