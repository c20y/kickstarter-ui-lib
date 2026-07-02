import React from "react";
import { FilePicker, FilePickerButton } from "@twilio-paste/core/file-picker";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { FormControl } from "@twilio-paste/core/form";
import type { FilePickerFieldProps } from "./types";

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
      buttonVariant = "secondary",
      ...rest
    },
    ref,
  ) => {
    const descriptionId = helpText || errorText ? `${id}-help` : undefined;

    return (
      <FormControl>
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
          <FilePickerButton variant={buttonVariant}>{buttonText}</FilePickerButton>
        </FilePicker>
        {(helpText || errorText) && (
          <HelpText
            id={descriptionId}
            variant={errorText ? "error" : "default"}
          >
            {errorText ?? helpText}
          </HelpText>
        )}
      </FormControl>
    );
  },
);

FilePickerField.displayName = "FilePickerField";
