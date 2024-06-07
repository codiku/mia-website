// "use client";

// const input = {
//   base: "w-full bg-white font-semibold py-1 px-3 rounded-full active:opacity-80 border-2 !border-black",
// };

// // Define the theme settings using the tv function
// export const themeSetting = {
//   input,
//   textarea: {
//     extend: input,
//     base: "text-red-200",
//   },
//   button: {
//     base: "font-medium bg-blue-500 text-white rounded-full active:opacity-80",
//     variants: {
//       color: {
//         primary: "bg-blue-500 text-white",
//         secondary: "bg-purple-500 text-white",
//       },
//       size: {
//         sm: "text-sm",
//         md: "text-base",
//         lg: "px-4 py-3 text-lg",
//       },
//     },
//     compoundVariants: [
//       {
//         size: ["sm", "md"],
//         class: "px-3 py-1",
//       },
//     ],
//     defaultVariants: {
//       size: "md",
//       color: "primary",
//     },
//   },
// };

// import { createContext, useContext } from "react";

// // Create a context
// const ThemeContext = createContext(themeSetting);

// // Context provider component
// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <ThemeContext.Provider value={themeSetting}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// // Custom hook to use the theme context
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };
