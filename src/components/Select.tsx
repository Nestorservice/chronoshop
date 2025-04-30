import { forwardRef, SelectHTMLAttributes, Ref } from "react";
import cx from "classnames";

function Select(
  { className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>,
  ref: Ref<HTMLSelectElement>
) {
  return (
    <select
      {...props}
      ref={ref}
      className={cx(
        "h-10 border border-gray-200 bg-white w-full rounded-sm px-2 outline-none focus:border-indigo-200 shadow-sm focus:shadow-indigo-100 focus:bg-indigo-50 focus:text-indigo-500",
        className
      )}
    >
      {children}
    </select>
  );
}

export default forwardRef(Select);
