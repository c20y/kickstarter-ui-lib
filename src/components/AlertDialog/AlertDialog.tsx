import { AlertDialog as PasteAlertDialog } from "@twilio-paste/core/alert-dialog";
import { Button } from "@twilio-paste/core/button";
import React from "react";
import type { AlertDialogProps } from "./types";

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      trigger,
      triggerVariant,
      destructive,
      isOpen: isOpenProp,
      onOpenChange,
      onConfirm,
      onDismiss,
      ...rest
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = isOpenProp !== undefined;
    const isOpen = isControlled ? isOpenProp : internalOpen;

    const setOpen = (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    };

    return (
      <>
        <Button
          variant={
            triggerVariant ?? (destructive ? "destructive" : "primary")
          }
          onClick={() => setOpen(true)}
        >
          {trigger}
        </Button>
        <PasteAlertDialog
          {...rest}
          destructive={destructive}
          isOpen={isOpen}
          ref={ref}
          onConfirm={() => {
            onConfirm();
            setOpen(false);
          }}
          onDismiss={() => {
            onDismiss?.();
            setOpen(false);
          }}
        />
      </>
    );
  },
);

AlertDialog.displayName = "AlertDialog";
