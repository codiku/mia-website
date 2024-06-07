import { tv, VariantProps } from "tailwind-variants";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyle>;

export const buttonStyle = tv({
  base: "font-medium bg-primary text-white rounded-userInteraction active:opacity-80",
  variants: {
    color: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "px-4 py-3 text-lg",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      class: "px-3 py-1",
    },
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  children,
  size,
  color,
  className,
  ...p
}: ButtonProps) => {
  return (
    <button
      type="button"
      {...p}
      className={buttonStyle({ size, color, className })}
    >
      {children}
    </button>
  );
};
