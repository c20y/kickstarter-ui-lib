export interface DateRangeFieldPickerProps {
  /**
   * The orientation of the date range picker. Can be either "horizontal" or "vertical". Defaults to "vertical".
   * @type {"horizontal" | "vertical"}
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The unique identifier for the start date input field.
   * @type {string}
   */
  startId: string;
  /**
   * The unique identifier for the end date input field.
   * @type {string}
   */
  endId: string;
  /**
   * The label for the start date input field. Defaults to "Start date".
   * @type {string}
   */
  startLabel?: string;
  /**
   * The label for the end date input field. Defaults to "End date".
   * @type {string}
   */
  endLabel?: string;
  /**
   * The initial value for the start date input field.
   * @type {string}
   */
  startValue?: string;
  /**
   * The initial value for the end date input field. Also used to set the maximum date for the start date input field.
   * @type {string}
   */
  endValue?: string;
  /**
   * The event handler for changes to the start date input field.
   * @type {React.ChangeEventHandler<HTMLInputElement>}
   */
  onStartChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The event handler for changes to the end date input field.
   * @type {React.ChangeEventHandler<HTMLInputElement>}
   */
  onEndChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The error text to display for the start date input field.
   * @type {string}
   */
  startErrorText?: string;
  /**
   * The error text to display for the end date input field.
   * @type {string}
   */
  endErrorText?: string;
  /**
   * The help text to display for the entire date range field group.
   * @type {string}
   */
  helpText?: string;
  /**
   * The minimum date that can be selected for both the start and end date input fields.
   * @type {string}
   */
  min?: string;
  /**
   * The maximum date that can be selected for both the start and end date input fields.
   * @type {string}
   */
  max?: string;
  /**
   * Whether the date range field group is required.
   * @type {boolean}
   */
  required?: boolean;
  /**
   * Whether the date range field group is disabled.
   * @type {boolean}
   */
  disabled?: boolean;
}
