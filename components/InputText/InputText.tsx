
import { tv, type VariantProps } from "tailwind-variants";

export const baseInputStyle = tv({
  base: "w-full  border-input border-inputBorderWidth  font-input p-input rounded-input active:opacity-80  hover:border-secondary",
  variants: {
    variant: {
      error: " !border-destructive border-inputBorderWidth",
      success: "!border-success border-inputBorderWidth ",
    },
    size: {
      big: "text-lg w-96",
      small: "text-sm w-32",
    },
  },
});
type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof baseInputStyle>;

export function InputText({
  size,
  variant,
  className,
  ...props
}: InputTextProps) {


  return (
    <input
      className={baseInputStyle({ className, size, variant })}
      {...props}
    />
  );
}
