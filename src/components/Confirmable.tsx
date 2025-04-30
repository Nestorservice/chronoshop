import React, { ComponentType, useState } from "react";

import ConfirmDialog from "./ConfirmDialog";

export type ConfirmFunctionType = {
  confirm: (payload: { title: string; content?: string }) => Promise<boolean>;
};

let resolveCallback: (value: boolean) => void;

function withConfirmation<T>(WrappedComponent: ComponentType<T>) {
  return function WithConfirmation(props: Omit<T, "confirm">) {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<{ title: string; content?: string }>({
      title: "",
      content: undefined,
    });

    function confirm(payload: { title: string; content?: string }) {
      setState(payload);
      setOpen(true);

      return new Promise<boolean>((resolve) => {
        resolveCallback = resolve;
      });
    }

    function onCancel() {
      setOpen(false);
      resolveCallback(false);
    }

    function onSubmit() {
      setOpen(false);
      resolveCallback(true);
    }

    return (
      <>
        <ConfirmDialog open={open} {...state} onCancel={onCancel} onSubmit={onSubmit} />
        <WrappedComponent confirm={confirm} {...(props as T)} />
      </>
    );
  };
}

export default withConfirmation;
