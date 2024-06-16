import { tv, type VariantProps } from "tailwind-variants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { baseInputStyle } from "../InputText/InputText";
type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof baseDropdownStyle>;

export const baseDropdownStyle = tv({
  extend: baseInputStyle,
});

export function InputSelect({
  size,
  className,
  variant,
  ...props
}: InputTextProps) {
  return (
    <Select>
      <SelectTrigger
        className={
          baseDropdownStyle({ className: className, size, variant })
        }
      >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
