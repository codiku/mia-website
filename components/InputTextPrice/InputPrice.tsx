import { tv } from "tailwind-variants";
import { Euro } from "lucide-react";
import { baseInputStyle } from "../InputText/InputText";

export const inputPriceStyle = tv({
  extend: baseInputStyle,
});

export function InputPrice(p: { className?: string }) {
  return (
    <div className="flex items-center gap-4 w-full relative ">
      <input
        type={"number"}
        className={inputPriceStyle({ className: [p.className] })}
      />
      <Euro className="absolute right-2 top-1/2 transform -translate-y-1/2" />
    </div>
  );
}
