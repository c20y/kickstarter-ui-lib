import React from "react";
import { Switch } from "@twilio-paste/core/switch";
import { HelpText } from "@twilio-paste/core/help-text";
import type { SwitchFieldProps } from "./types";

export const SwitchField = React.forwardRef<HTMLInputElement, SwitchFieldProps>(
  ({ id, label, helpText, errorText, ...rest }, ref) => {
    const resolvedHelpText = errorText ? (
      <HelpText variant="error">{errorText}</HelpText>
    ) : (
      helpText
    );

    return (
      <Switch
        ref={ref}
        id={id}
        hasError={!!errorText}
        helpText={resolvedHelpText}
        {...rest}
      >
        {label}
      </Switch>
    );
  },
);

SwitchField.displayName = "SwitchField";
