import React from "react";
import cx from "classnames";
import { CheckIcon } from "@heroicons/react/outline";

function Checkbox({ className, children, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cx("flex items-center", className)}>
      <input type="checkbox" className="hidden peer" {...props} />
      <span className="flex items-center justify-center h-7 w-7 bg-gray-50 hover:border-gray-300 shadow-sm border border-gray-200 rounded-sm text-gray-50 peer-checked:shadow-indigo-100 peer-checked:bg-indigo-100 peer-checked:text-indigo-500 peer-checked:border-indigo-200 peer-checked:hover:border-indigo-300">
        <CheckIcon className="w-5 h-5" />
      </span>
      {children && <span className="ml-4">{children}</span>}
    </label>
  );
}

export default Checkbox;
