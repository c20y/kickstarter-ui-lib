import { RadioGroup, Radio } from "@twilio-paste/core/radio-group";
import type { RadioFieldProps } from "./types";

export const RadioField = ({
  name,
  label,
  options,
  ...rest
}: RadioFieldProps) => (
  <RadioGroup name={name} legend={label} {...rest}>
    {options.map(({ label: optionLabel, value, ...optionRest }) => (
      <Radio key={value} id={`${name}-${value}`} value={value} {...optionRest}>
        {optionLabel}
      </Radio>
    ))}
  </RadioGroup>
);

RadioField.displayName = "RadioField";
