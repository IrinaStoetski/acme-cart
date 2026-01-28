import { Button as RACButton, type ButtonProps as RACButtonProps } from "react-aria-components";
import { type VariantProps } from "tailwind-variants";
import { style } from "./style";

interface ButtonProps extends RACButtonProps, VariantProps<typeof style> {
  children?: React.ReactNode;
}

const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <RACButton
      {...props}
      className={(renderProps) =>
        style({
          variant,
          isDisabled: renderProps.isDisabled,
          className: typeof className === "function" ? className(renderProps) : className,
        })
      }
    >
      {children}
    </RACButton>
  );
};

export default Button;
