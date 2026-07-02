import {
  ProgressBar as PasteProgressBar,
  ProgressBarLabel,
} from "@twilio-paste/core/progress-bar";
import { HelpText } from "@twilio-paste/core/help-text";
import { Box } from "@twilio-paste/core/box";
import React from "react";
import type { ProgressBarProps } from "./types";

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ id, label, helpText, errorText, valueLabel, disabled, ...rest }, ref) => {
    const descriptionId = helpText || errorText ? `${id}-help` : undefined;

    return (
      <Box>
        <ProgressBarLabel htmlFor={id} valueLabel={valueLabel} disabled={disabled}>
          {label}
        </ProgressBarLabel>
        <PasteProgressBar
          ref={ref}
          id={id}
          valueLabel={valueLabel}
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
      </Box>
    );
  },
);

ProgressBar.displayName = "ProgressBar";
