import type { InputBoxTypes } from "@twilio-paste/core/input-box";
import type { HTMLPasteProps } from "@twilio-paste/types";

export interface InputFieldProps extends Omit<
  HTMLPasteProps<"input">,
  "type" | "height" | "width" | "size" | "value" | "defaultValue"
> {
  id?: string;
  label: string;
  type?: InputBoxTypes;
  value?: string | number;
  defaultValue?: string | number;
  helpText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  labelOptional?: boolean;
  insertBefore?: React.ReactNode;
  insertAfter?: React.ReactNode;
  variant?: "default" | "inverse";
}
