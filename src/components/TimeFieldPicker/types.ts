import type { TimePickerProps } from "@twilio-paste/core/time-picker";

export interface TimeFieldPickerProps extends Omit<
  TimePickerProps,
  "hasError" | "element" | "id"
> {
  id: string;
  label: string;
  helpText?: string;
  errorText?: string;
  labelOptional?: boolean;
}
