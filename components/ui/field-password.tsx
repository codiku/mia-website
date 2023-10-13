import { forwardRef, useState } from "react";
import { Input, InputProps } from "./input";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

// Create a new component named FieldPassword
export const FieldPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input type={showPassword ? "text" : "password"} {...props} />
        <div className="absolute right-2 inset-y-2">
          {showPassword ? (
            <EyeOff
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-slate-500"
            />
          ) : (
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-slate-300"
            />
          )}
        </div>
      </div>
    );
  }
);
FieldPassword.displayName = "FieldPassword";
