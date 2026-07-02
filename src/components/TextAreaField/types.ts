import type { HTMLPasteProps } from "@twilio-paste/types";

export interface TextareaFieldProps extends Omit<
  HTMLPasteProps<"textarea">,
  "maxRows"
> {
  id: string;
  label: string;
  helpText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  labelOptional?: boolean;
  insertBefore?: React.ReactNode;
  insertAfter?: React.ReactNode;
  variant?: "default" | "inverse";
  minRows?: number;
  maxRows?: number;
  resize?: "none" | "vertical";
}
