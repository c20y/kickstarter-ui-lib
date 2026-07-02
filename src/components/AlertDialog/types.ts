import type { AlertDialogProps as PasteAlertDialogProps } from "@twilio-paste/core/alert-dialog";
import type { ButtonProps } from "@twilio-paste/core/button";

export interface AlertDialogProps
  extends Omit<
    PasteAlertDialogProps,
    "element" | "onConfirmDisabled" | "isOpen" | "onDismiss"
  > {
  /**
   * Content of the button that opens the Alert Dialog. Do not nest focusable
   * or actionable elements inside this - it becomes the accessible label of
   * the trigger button.
   * @type {React.ReactNode}
   */
  trigger: NonNullable<React.ReactNode>;
  /**
   * Variant of the trigger button. Defaults to "destructive" when
   * `destructive` is true, otherwise "primary".
   * @type {ButtonProps["variant"]}
   */
  triggerVariant?: ButtonProps["variant"];
  /**
   * Called when the dialog is dismissed. The dialog always closes on
   * dismiss - this is for side effects only (e.g. analytics).
   * @type {() => void}
   */
  onDismiss?: () => void;
  /**
   * Controls the dialog's open state externally. Omit to let the component
   * manage its own open/closed state, opened by the trigger button.
   * @type {boolean}
   */
  isOpen?: boolean;
  /**
   * Called whenever the dialog's open state changes (trigger click, confirm,
   * or dismiss). Pass this alongside `isOpen` to drive the dialog externally.
   * @type {(isOpen: boolean) => void}
   */
  onOpenChange?: (isOpen: boolean) => void;
}
