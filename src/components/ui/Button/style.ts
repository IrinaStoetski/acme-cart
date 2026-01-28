import { tv } from "tailwind-variants";

export const style = tv({
  base: "cursor-pointer flex items-center justify-center rounded px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2",
  variants: {
    variant: {
      primary: "bg-rose-600 text-white hover:bg-rose-700 data-[pressed]:bg-rose-800",
      secondary: "border border-rose-600 text-rose-600 hover:bg-rose-100 data-[pressed]:bg-rose-400",
    },
    isDisabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
