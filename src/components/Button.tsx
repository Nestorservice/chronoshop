import { ButtonHTMLAttributes, forwardRef, Ref } from "react";
import cx from "classnames";

const variants: { [key: string]: string } = {
  primary:
    "bg-indigo-100 border-indigo-200 text-indigo-500 shadow-indigo-100 hover:border-indigo-300 focus:shadow-indigo-200 focus:bg-indigo-200 focus:border-indigo-300 focus:text-indigo-600 active:shadow-indigo-200 active:bg-indigo-200 active:border-indigo-300 active:text-indigo-600",
  secondary:
    "bg-gray-50 border-gray-200 hover:border-gray-300 focus:shadow-gray-100 focus:bg-gray-100 focus:border-gray-300 active:shadow-gray-100 active:bg-gray-100 active:border-gray-300",
};

const sizes: { [key: string]: string } = {
  small: "h-8",
  normal: "h-10 px-4",
};

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "small" | "normal";
};

function Button(
  {
    className,
    variant = "primary",
    size = "normal",
    ...props
  }: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      ref={ref}
      className={cx(
        "rounded-sm outline-none shadow-sm border font-semibold uppercase text-xs cursor-pointer disabled:opacity-60 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
    />
  );
}

export default forwardRef(Button);
