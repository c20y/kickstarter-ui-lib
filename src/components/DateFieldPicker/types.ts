import type { DatePickerProps } from "@twilio-paste/core";

export interface DateFieldPickerProps extends Omit<
  DatePickerProps,
  "hasError" | "element" | "id"
> {
  /**
   * The unique id of the input field. This is used to associate the label and help text with the input.
   * @type {string}
   */
  id: string;
  /**
   * The label for the input field. This is used to describe the purpose of the input field to the user.
   * @type {string}
   */
  label: string;
  /**
   * The help text for the input field. This is used to provide additional information about the input field to the user.
   * @type {string}
   */
  helpText?: string;
  /**
   * The error text for the input field. This is used to provide feedback to the user when the input field is invalid.
   * @type {string}
   */
  errorText?: string;
  /**
   * Whether the label should display as optional. This is used to indicate to the user that the input field is not required.
   * @type {boolean}
   */
  labelOptional?: boolean;

  /**
   * Whether the input field is required. This is used to indicate to the user that the input field must be filled out before submitting the form.
   * @type {boolean}
   */
}
