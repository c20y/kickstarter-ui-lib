import type { OptionProps, OptionGroupProps } from "@twilio-paste/core/select";
import type { HTMLPasteProps } from "@twilio-paste/types";

export interface SelectOption extends Omit<
  OptionProps,
  "children" | "element"
> {
  label: string;
}

export interface SelectOptionGroup extends Omit<
  OptionGroupProps,
  "children" | "element"
> {
  options: SelectOption[];
}

export interface SelectFieldProps extends Omit<
  HTMLPasteProps<"select">,
  "children"
> {
  id: string;
  label: string;
  options: Array<SelectOption | SelectOptionGroup>;
  helpText?: string;
  errorText?: string;
  required?: boolean;
  value?: string | string[];
  disabled?: boolean;
  labelOptional?: boolean;
  insertBefore?: React.ReactNode;
  insertAfter?: React.ReactNode;
  variant?: "default" | "inverse";
}
