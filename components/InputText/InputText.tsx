import { tv, type VariantProps } from "tailwind-variants";

export const baseInputStyle = tv({
  base: "w-full bg-white border-[1px] font-semibold py-1 px-3 rounded-userInteraction active:opacity-80  border-primary hover:border-secondary",
  variants: {
    variant: {
      error: "border-red-400",
      success: "border-green-400",
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
