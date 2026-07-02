import type { FilePickerProps, FilePickerButtonProps } from "@twilio-paste/core/file-picker";

export interface FilePickerFieldProps extends Omit<
  FilePickerProps,
  "hasError" | "element" | "id" | "children"
> {
  id: string;
  label: string;
  helpText?: string;
  errorText?: string;
  labelOptional?: boolean;
  buttonText?: string;
  buttonVariant?: FilePickerButtonProps["variant"];
}
