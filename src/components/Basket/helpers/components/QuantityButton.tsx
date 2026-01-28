import { Button, type ButtonProps } from "react-aria-components";

interface Props extends ButtonProps {
  children?: React.ReactNode;
}

const QuantityButton = ({ onPress, children }: Props) => (
  <Button
    className="rounded-full cursor-pointerp-2 border border-gray-400 w-8 h-8 flex items-center justify-center"
    onPress={onPress}
  >
    {children}
  </Button>
);

export default QuantityButton;
