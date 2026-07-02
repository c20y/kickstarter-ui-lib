import type { SliderProps as PasteSliderProps } from "@twilio-paste/core/slider";

export interface SliderProps
  extends Omit<
    PasteSliderProps,
    "element" | "aria-describedby" | "aria-labelledby"
  > {
  label: string;
  helpText?: string;
  errorText?: string;
  /**
   * Uncontrolled starting value (e.g. 50 instead of the implicit min). Not
   * part of Paste's typed SliderProps, but supported at runtime by the
   * underlying react-stately slider state hook.
   * @type {number}
   */
  defaultValue?: number;
}
