import type { ReactNode } from "react";
import type { HTMLPasteProps } from "@twilio-paste/types";

export interface SwitchFieldProps extends Omit<
  HTMLPasteProps<"input">,
  "children"
> {
  id: string;
  label: NonNullable<ReactNode>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  helpText?: string;
  errorText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  i18nRequiredLabel?: string;
}
