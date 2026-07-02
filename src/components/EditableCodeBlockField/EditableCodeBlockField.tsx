import {
  EditableCodeBlock,
  EditableCodeBlockWrapper,
  EditableCodeBlockHeader,
} from "@twilio-paste/core/editable-code-block";
import { HelpText } from "@twilio-paste/core/help-text";
import type { EditableCodeBlockFieldProps } from "./types";

export const EditableCodeBlockField = ({
  label,
  labelAs = "h3",
  helpText,
  errorText,
  ...rest
}: EditableCodeBlockFieldProps) => (
  <EditableCodeBlockWrapper>
    <EditableCodeBlockHeader as={labelAs}>{label}</EditableCodeBlockHeader>
    {(helpText || errorText) && (
      <HelpText variant={errorText ? "error" : "default"}>
        {errorText ?? helpText}
      </HelpText>
    )}
    <EditableCodeBlock {...rest} />
  </EditableCodeBlockWrapper>
);

EditableCodeBlockField.displayName = "EditableCodeBlockField";
