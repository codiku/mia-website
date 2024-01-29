# Next Boiler Plate

Next.JS + Typescript + Next Auth + Tailwind + Shadcnui + Prisma + Supabase

**🚀 Elevate your web development with our Next Auth + Tailwind + Shadcnui Boilerplate, the perfect foundation for building blazing fast, secure, and user-friendly web applications.**

**⚡️ Unleash the power of Next Auth, Tailwind CSS, and Shadcnui to create stunning web experiences.**

This comprehensive boilerplate provides a solid foundation for building modern web applications with the latest technologies. It features seamless user authentication, rapid styling with Tailwind CSS, data validation with Zod, toast and response management with axios-config, routes protection and validations with safeEndPoint(), CRUD generation shortcut, efficient database interaction with Prisma, and user interface enhancements with Shadcnui.

**🔥 Key Features:**

* **Next Auth for Seamless Authentication:** Seamlessly manage user authentication, including login, registration, password resets, and email verification.

* **Tailwind CSS for Blazing Speed and Consistency:** Leverage Tailwind CSS's utility-first approach for rapid and consistent styling across all devices.

* **Data Validation with Zod:** Ensure data integrity and prevent errors with Zod, a powerful JSON schema validator.

* **Toast and Response Management with Axios-config:** Easily display alerts and manage responses with axios-config.

* **Routes Protection and Validations with safeEndPoint() hoc:** Protect your routes and enforce data validations with the safeEndPoint() hoc.

* **CRUD Generation Shortcut with npm run crud:** Quickly generate GET, POST, PATCH, and DELETE API routes.

* **Database Management with Prisma:** Efficiently interact with your Supabase database with Prisma, an open-source ORM.

* **User Interface Enhancements with Shadcnui:** Enhance the user experience with Shadcnui, a react component library for building user interfaces.

**✨ Why Choose This Boilerplate?**

* **Blazing Performance:** Enjoy blazing fast performance with server-side rendering and code splitting optimizations.

* **Enhanced Security:** Implement robust security measures with strong password hashing, CSRF protection, and rate limiting.

* **Streamlined Development:** Simplify your development process with pre-configured tools and libraries.

* **Seamless User Experience:** Deliver a seamless and intuitive user experience with Tailwind CSS and Shadcnui.

* **Effortless Data Management:** Manage your data effectively with Prisma and Zod.

# Setup

Install packages
`npm i`
Start the local db
`npm run db:start`
Display the db
`npm run db:studio`


## Toast and response

By default axios-config display alerts. Unless you send isToastDisabled:false in header

## Routes Protection , and validations 100% TS support with Zod validation
### safeEndPoint

#### Public an privates routes

Add public routes to `middleware.ts

Api routes :

Just wrap your handler with the `safeEndPoint()` hoc,

The signature is the following :

```javascript
export const GET = safeEndPoint(
  async (req: NextRequest, uriParams, bodyData, queryParams, jwtToken) => {
    // your code
  },
  isValidAuthTokenRequired, // boolean (false if public, true is private )
  ZodSchemaForBody, //Zod Schema for the body
  ZodSchemaForQueryParams // Zod Schema for the query params
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

## Swagger

All Prisma and Zod models are automatically added to Swagger and can be used as JS Doc above the endpoint. Here is an example from `route.ts`:

```javascript
/**
  * @swagger
  * /api/product:
  *   get:
  *     description: Get all products
  *     responses:
  *       200:
  *         description: Returns a list of products
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/ProductModel'
  *       400:
  *         description: Bad request if the product data is invalid
  */
  export const GET = safeEndPoint(async (req: NextRequest) => {
  const product = await db.product.findMany({});
  return NextResponse.json(product || { error: true, message: "Not found" }, {
    status: StatusCodes.BAD_REQUEST,
  });
}, true);
```

In this example, the `Product` schema from Prisma and Zod is used in the Swagger documentation for the GET endpoint of the `/api/product` route. This provides a clear and accurate description of the data structure expected in the response.
