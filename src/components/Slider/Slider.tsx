import { Slider as PasteSlider } from "@twilio-paste/core/slider";
import type { SliderProps as PasteSliderProps } from "@twilio-paste/core/slider";
import { Label } from "@twilio-paste/core/label";
import { HelpText } from "@twilio-paste/core/help-text";
import { FormControl } from "@twilio-paste/core/form";
import React from "react";
import type { SliderProps } from "./types";

const SliderWithDefaultValue = PasteSlider as unknown as React.ForwardRefExoticComponent<
  PasteSliderProps &
    { defaultValue?: number } &
    React.RefAttributes<HTMLInputElement>
>;

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ id, label, helpText, errorText, disabled, ...rest }, ref) => {
    const descriptionId = helpText || errorText ? `${id}-help` : undefined;

    return (
      <FormControl>
        <Label htmlFor={id} disabled={disabled}>
          {label}
        </Label>
        <SliderWithDefaultValue
          ref={ref}
          id={id}
          disabled={disabled}
          hasError={!!errorText}
          aria-describedby={descriptionId}
          {...rest}
        />
        {(helpText || errorText) && (
          <HelpText id={descriptionId} variant={errorText ? "error" : "default"}>
            {errorText ?? helpText}
          </HelpText>
        )}
      </FormControl>
    );
  },
);

Slider.displayName = "Slider";
