import React from "react";
import { TextArea } from "@twilio-paste/core/textarea";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { FormControl } from "@twilio-paste/core/form";
import type { TextareaFieldProps } from "./types";

export const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(
  (
    {
      id,
      label,
      helpText,
      errorText,
      required,
      disabled,
      readOnly,
      labelOptional,
      insertBefore,
      insertAfter,
      variant,
      minRows,
      maxRows,
      resize,
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
          variant={variant}
        >
          {label}
        </Label>
        <TextArea
          ref={ref}
          id={id}
          hasError={!!errorText}
          aria-describedby={descriptionId}
          aria-invalid={!!errorText}
          insertBefore={insertBefore}
          insertAfter={insertAfter}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          variant={variant}
          minRows={minRows}
          maxRows={maxRows}
          resize={resize}
          {...rest}
        />
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

TextareaField.displayName = "TextareaField";
