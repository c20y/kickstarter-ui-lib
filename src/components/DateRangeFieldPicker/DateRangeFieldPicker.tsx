import { Stack } from "@twilio-paste/core/stack";
import { FormSection, FormSectionDescription } from "@twilio-paste/core/form";
import { DateFieldPicker } from "../DateFieldPicker/DateFieldPicker";
import type { DateRangeFieldPickerProps } from "./types";

export const DateRangeFieldPicker = ({
  orientation = "vertical",
  startId,
  endId,
  startLabel = "Start date",
  endLabel = "End date",
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  startErrorText,
  endErrorText,
  helpText,
  min,
  max,
  required,

  disabled,
}: DateRangeFieldPickerProps) => (
  <FormSection>
    <Stack orientation={orientation} spacing="space70">
      <DateFieldPicker
        id={startId}
        label={startLabel}
        value={startValue}
        onChange={onStartChange}
        errorText={startErrorText}
        min={min}
        max={endValue || max}
        disabled={disabled}
        required={required}
      />
      <DateFieldPicker
        id={endId}
        label={endLabel}
        value={endValue}
        onChange={onEndChange}
        errorText={endErrorText}
        min={startValue || min}
        max={max}
        disabled={disabled}
        required={required}
      />
    </Stack>
    {helpText && <FormSectionDescription>{helpText}</FormSectionDescription>}
  </FormSection>
);

DateRangeFieldPicker.displayName = "DateRangeFieldPicker";
