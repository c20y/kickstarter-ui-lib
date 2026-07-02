import type { RadioGroupProps, RadioProps } from "@twilio-paste/core/radio-group";

export interface RadioOption extends Omit<
  RadioProps,
  "id" | "name" | "checked" | "hasError" | "children"
> {
  value: string;
  label: NonNullable<React.ReactNode>;
}

export interface RadioFieldProps extends Omit<
  RadioGroupProps,
  "legend" | "children"
> {
  label: string | NonNullable<React.ReactNode>;
  options: RadioOption[];
}
