import { forwardRef, InputHTMLAttributes, Ref } from "react";
import cx from "classnames";

function Input(
  { className, ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      {...props}
      ref={ref}
      className={cx(
        "h-10 border border-gray-200 bg-white rounded-sm px-2 outline-none focus:border-indigo-200 shadow-sm focus:shadow-indigo-100 focus:bg-indigo-50 focus:text-indigo-500",
        className
      )}
    />
  );
}

export default forwardRef(Input);
