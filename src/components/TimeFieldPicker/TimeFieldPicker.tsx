import React from "react";
import { TimePicker } from "@twilio-paste/core/time-picker";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { FormControl } from "@twilio-paste/core/form";
import type { TimeFieldPickerProps } from "./types";

export { formatReturnTime } from "@twilio-paste/core/time-picker";

export const TimeFieldPicker = React.forwardRef<
  HTMLInputElement,
  TimeFieldPickerProps
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
        <TimePicker
          ref={ref}
          id={id}
          hasError={!!errorText}
          aria-describedby={descriptionId}
          aria-invalid={!!errorText}
          disabled={disabled}
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

TimeFieldPicker.displayName = "TimeFieldPicker";
