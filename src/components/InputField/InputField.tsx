import React from "react";
import { Input } from "@twilio-paste/core/input";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { FormControl } from "@twilio-paste/core/form";
import type { InputFieldProps } from "./types";

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      type = "text",
      value,
      defaultValue,
      helpText,
      errorText,
      required,
      disabled,
      readOnly,
      labelOptional,
      insertBefore,
      insertAfter,
      variant,
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
        <Input
          ref={ref}
          id={id}
          type={type}
          value={value !== undefined ? String(value) : undefined}
          defaultValue={
            defaultValue !== undefined ? String(defaultValue) : undefined
          }
          hasError={!!errorText}
          aria-describedby={descriptionId}
          aria-invalid={!!errorText}
          insertBefore={insertBefore}
          insertAfter={insertAfter}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          variant={variant}
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

InputField.displayName = "InputField";
