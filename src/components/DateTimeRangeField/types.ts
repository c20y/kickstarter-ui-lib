export interface DateTimeRangePickerFieldProps {
  /**
   * The unique id of the start date input field. This is used to associate the label and help text with the input.
   * @type {string}
   */
  startDateId: string;
  /**
   * The unique id of the start time input field. This is used to associate the label and help text with the input.
   * @type {string}
   */
  startTimeId: string;
  /**
   * The unique id of the end date input field. This is used to associate the label and help text with the input.
   * @type {string}
   */
  endDateId: string;
  /**
   * The unique id of the end time input field. This is used to associate the label and help text with the input.
   * @type {string}
   */
  endTimeId: string;
  /**
   * The label for the start date input field. This is used to describe the purpose of the input field to the user.
   * @type {string}
   */
  startDateLabel?: string;
  /**
   * The label for the start time input field. This is used to describe the purpose of the input field to the user.
   * @type {string}
   */
  startTimeLabel?: string;
  /**
   * The label for the end date input field. This is used to describe the purpose of the input field to the user.
   * @type {string}
   */
  endDateLabel?: string;
  /**
   * The label for the end time input field. This is used to describe the purpose of the input field to the user.
   * @type {string}
   */
  endTimeLabel?: string;
  /**
   * The value for the start date input field. This is used to set the initial value of the input field.
   * @type {string}
   */
  startDateValue?: string;
  /**
   * The value for the start date input field. This is used to set the initial value of the input field.
   * @type {string}
   */
  startTimeValue?: string;
  /**
   * The value for the end date input field. This is used to set the initial value of the input field.
   * @type {string}
   */
  endDateValue?: string;
  /**
   * The value for the end time input field. This is used to set the initial value of the input field.
   * @type {string}
   */
  endTimeValue?: string;
  /**
   * The onChange handler for the start date input field. This is used to handle changes to the input field.
   * @type {React.ChangeEventHandler<HTMLInputElement>}
   */
  onStartDateChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The onChange handler for the start time input field. This is used to handle changes to the input field.
   * @type {React.ChangeEventHandler<HTMLInputElement>}
   */
  onStartTimeChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The onChange handler for the end date input field. This is used to handle changes to the input field.
   * @type {React.ChangeEventHandler<HTMLInputElement>}
   */
  onEndDateChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The onChange handler for the end time input field. This is used to handle changes to the input field.
   * @type {React.ChangeEventHandler<HTMLInputElement>}
   */
  onEndTimeChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The error text for the start date input field. This is used to provide feedback to the user when the input field is invalid.
   * @type {string}
   */
  startDateErrorText?: string;
  /**
   * The error text for the start time input field. This is used to provide feedback to the user when the input field is invalid.
   * @type {string}
   */
  startTimeErrorText?: string;
  /**
   * The error text for the end date input field. This is used to provide feedback to the user when the input field is invalid.
   * @type {string}
   */
  endDateErrorText?: string;
  /**
   * The error text for the end time input field. This is used to provide feedback to the user when the input field is invalid.
   * @type {string}
   */
  endTimeErrorText?: string;
  /**
   * The help text for the input field. This is used to provide additional information about the input field to the user.
   * @type {string}
   */

  helpText?: string;
  /**
   * The minimum date for the start date input field. This is used to restrict the user from selecting a date before the specified minimum date.
   * @type {string}
   */
  min?: string;
  /**
   * The maximum date for the end date input field. This is used to restrict the user from selecting a date after the specified maximum date.
   * @type {string}
   */
  max?: string;
  /**
   * Whether the input field is required. This is used to indicate to the user that the input field must be filled out before submitting the form.
   * @type {boolean}
   */
  required?: boolean;
  /**
   * Whether the input field is disabled. This is used to indicate to the user that the input field is not editable.
   * @type {boolean}
   */
  disabled?: boolean;
}
