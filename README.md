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

**🎉 Embark on Your Web Development Journey with Confidence:**

Take your web development skills to the next level with this comprehensive boilerplate. Build stunning and secure applications that your users will love.

**🚀 Get started today and unleash the power of Next Auth, Tailwind, and Shadcnui!**

## Toast and response

By default axios-config display alerts. Unless you send isToastDisabled:false in header

## Routes Protection , and validations

Pages : See middleware.ts to protect a page

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
