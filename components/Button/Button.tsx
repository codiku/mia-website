import { tv, VariantProps } from "tailwind-variants";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyle>;

export const buttonStyle = tv({
  base: "px-[var(--button-padding-x)] py-[var(--button-padding-y)] font-button bg-button text-button-text rounded-button active:opacity-80",
  variants: {
    color: {
      primary: "bg-primary",
      secondary: "bg-secondary text-black",
    }
  },


});

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  children,
  color,
  className,
  ...p
}: ButtonProps) => {
  return (
    <button
      type="button"
      {...p}
      className={buttonStyle({ color, className })}
    >
      {children}
    </button>
  );
};
