import type { ProgressBarProps as PasteProgressBarProps } from "@twilio-paste/core/progress-bar";

export interface ProgressBarProps
  extends Omit<
    PasteProgressBarProps,
    "element" | "aria-describedby" | "aria-labelledby" | "minValue"
  > {
  id: string;
  label: string;
  helpText?: string;
  errorText?: string;
}
