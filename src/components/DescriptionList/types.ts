import type { DescriptionListProps as PasteDescriptionListProps } from "@twilio-paste/core/description-list";

export interface DescriptionListEntry {
  term: React.ReactNode | React.ReactNode[];
  details?: React.ReactNode | React.ReactNode[];
}

export interface DescriptionListProps extends Omit<
  PasteDescriptionListProps,
  "children" | "element"
> {
  /**
   * An array of objects representing the terms and details to be displayed in the description list. Each object should have a `term` property (the term to be displayed) and an optional `details` property (the details associated with the term).
   * @type {DescriptionListEntry[]}
   */
  items: DescriptionListEntry[];
}
