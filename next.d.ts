// Use type safe message keys with `next-intl`
type Messages = typeof import("./messages/en.json");
declare interface IntlMessages extends Messages {}

declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;
    HASH_ROUND: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_FROM: string;
    SIGNUP_CALLBACK_URL: string;
    FORGOT_PASSWORD_CALLBACK_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_GOOGLE_CALLBACK_URL: string;
  }
}
