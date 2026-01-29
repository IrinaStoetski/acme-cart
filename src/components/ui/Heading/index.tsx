import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: Props) => (
  <h2 className={twMerge("text-2xl w-full font-semibold mb-8 text-center", className)}>{children}</h2>
);

export default Heading;
