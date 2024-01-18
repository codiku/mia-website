# Next auth


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
