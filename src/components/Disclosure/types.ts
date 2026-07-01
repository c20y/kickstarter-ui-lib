import type { DisclosureStateReturn } from "@twilio-paste/core/disclosure";
import type { HeadingProps } from "@twilio-paste/core/heading";

export interface DisclosureProps {
  /**
   * Content of the disclosure trigger. Do not nest focusable or actionable
   * elements (buttons, links) inside this - Paste's own accessibility
   * guidance is that nested actionable elements are difficult to discover
   * for assistive technology users, since their existence often isn't
   * announced.
   * @type {React.ReactNode}
   */
  heading: NonNullable<React.ReactNode>;
  /**
   * The semantic heading level (h1-h6). Required
   * @type {HeadingProps["as"]}
   */
  headingAs: HeadingProps["as"];
  /**
   * The variant of the heading. This is optional and defaults to "heading30".
   * @type {HeadingProps["variant"]}
   * @default "heading30"
   */
  headingVariant?: HeadingProps["variant"];
  /**
   * The variant of the disclosure. This is optional and defaults to "default".
   * @type {"default" | "contained"}
   * @default "default"
   */
  variant?: "default" | "contained";
  /**   * Whether the disclosure is visible by default. This is optional and defaults to false.
   * @type {boolean}
   * @default false
   */
  defaultVisible?: boolean;
  /**   * The state of the disclosure. This is optional and can be used to control the disclosure state externally.
   * @type {DisclosureStateReturn}
   */
  state?: DisclosureStateReturn;
  /**
   * Whether the disclosure is disabled. This is optional and defaults to false.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * The content of the disclosure. This is required and will be rendered as the disclosure content.
   * @type {React.ReactNode}
   */
  children: NonNullable<React.ReactNode>;
}
