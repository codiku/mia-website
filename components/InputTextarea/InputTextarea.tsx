import { tv } from "tailwind-variants";
import { baseInputStyle } from "../InputText/InputText";

const textareaStyle = tv({
  extend: baseInputStyle,
  base: "",
});

export function InputTextarea(p: { className?: string }) {
  return <textarea className={textareaStyle({ className: p.className })} />;
}
