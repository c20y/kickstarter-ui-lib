import React from "react";
import { FilePicker, FilePickerButton } from "@twilio-paste/core/file-picker";
import type { FilePickerProps } from "@twilio-paste/core/file-picker";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { Box } from "@twilio-paste/core/box";

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
}

export const FilePickerField = React.forwardRef<
  HTMLInputElement,
  FilePickerFieldProps
>(
  (
    {
      id,
      label,
      helpText,
      errorText,
      labelOptional,
      disabled,
      required,
      buttonText = "Choose file",
      ...rest
    },
    ref,
  ) => {
    const descriptionId = helpText || errorText ? `${id}-help` : undefined;

    return (
      <Box>
        <Label
          htmlFor={id}
          required={required}
          optional={labelOptional}
          disabled={disabled}
        >
          {label}
        </Label>
        <FilePicker
          ref={ref}
          id={id}
          aria-describedby={descriptionId}
          aria-invalid={!!errorText}
          disabled={disabled}
          required={required}
          {...rest}
        >
          <FilePickerButton variant="secondary">{buttonText}</FilePickerButton>
        </FilePicker>
        {(helpText || errorText) && (
          <HelpText
            id={descriptionId}
            variant={errorText ? "error" : "default"}
          >
            {errorText ?? helpText}
          </HelpText>
        )}
      </Box>
    );
  },
);

FilePickerField.displayName = "FilePickerField";
