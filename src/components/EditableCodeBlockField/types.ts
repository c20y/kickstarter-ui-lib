import type { EditableCodeBlockProps } from "@twilio-paste/core/editable-code-block";

export interface EditableCodeBlockFieldProps extends Omit<
  EditableCodeBlockProps,
  "element" | "children"
> {
  label: string;
  labelAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  helpText?: string;
  errorText?: string;
}
