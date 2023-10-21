# Next auth

## ENV

NEXTAUTH_URL=http://localhost:3000

DATABASE_URL=postgresql://postgres:kdaklzkjkajsazdzad@db.abscfhjsvhyfcbnddmwq.supabase.co:5432/postgres

NEXTAUTH_SECRET=6rM9SG9Jtx3Ij5Wp2O3n5Yg3hTfN6CpDqD5ZsItJ7hCfWm9WdUaV3ZqD1SgXrHtKs
HASH_ROUND=12

SMTP_USER=apikey
SMTP_PASSWORD=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

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_FROM=robin.lebhar.chill.studio@gmail.com

SIGNUP_CALLBACK_URL=http://localhost:3000
FORGOT_PASSWORD_CALLBACK_URL=http://localhost:3000/auth/reset-password

GOOGLE_CLIENT_ID=763622883304-h8or7a6lhhdpt68sdqludio341qkkamv.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:3000

## Toast and response

By default axios-config display alerts. Unless you send isToastDisabled:false in header

## Routes Protection , and validations

Pages :

See middleware.ts to protect a page

Api routes :

Just wrap your handler with safeEndPoint() hoc,

The signature is the following :

```javascript
export const GET = safeEndPoint(
  async (req: NextRequest, uriParams, bodyData, queryParams, jwtToken) => {
    // your code
  },
  isValidAuthTokenRequired, // boolean
  ZodSchemaForBody, //Zod Schema
  ZodSchemaForQueryParams // Zod Schema
);
```

It handles validations for body and query params with typing

You can toggle auth easily

Handle auth error and validations error

## Session

To make sure you have access to the session, use withSession

## Crud

`npm run crud`

will create GET,POST,PATCH,DELETE, a prisma schema, a zod prisma schema.
