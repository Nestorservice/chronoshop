import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

import Button from "./Button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  content?: string;
  onCancel: () => void;
  onSubmit: () => void;
};

function ConfirmDialog({ open, title, content, onCancel, onSubmit }: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex items-center justify-center z-20" />
        <Dialog.Content
          onEscapeKeyDown={onCancel}
          className="bg-white rounded-md drop-shadow-2xl w-11/12 max-w-lg fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Dialog.Title className="p-4 -mb-px border-b border-gray-200 text-indigo-800 text-base font-semibold">
            {title}
          </Dialog.Title>
          {content && <Dialog.Description className="p-4">{content}</Dialog.Description>}
          <footer className="px-4 py-2 bg-gray-50 text-right rounded-b-md border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              className="mr-2"
              title="Cancel"
              onClick={onCancel}
            >
              <XIcon className="w-5 h-5" />
            </Button>
            <Button title="Submit" onClick={onSubmit}>
              <CheckIcon className="w-5 h-5" />
            </Button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ConfirmDialog;
