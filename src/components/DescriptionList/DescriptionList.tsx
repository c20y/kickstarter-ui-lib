import {
  DescriptionList as PasteDescriptionList,
  DescriptionListSet,
  DescriptionListTerm,
  DescriptionListDetails,
} from "@twilio-paste/core/description-list";
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

const toArray = (
  value?: React.ReactNode | React.ReactNode[],
): React.ReactNode[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

export const DescriptionList = ({ items, ...rest }: DescriptionListProps) => (
  <PasteDescriptionList {...rest}>
    {items.map((item, index) => {
      const terms = toArray(item.term);
      const details = toArray(item.details);

      return (
        <DescriptionListSet key={index}>
          {terms.map((term, termIndex) => (
            <DescriptionListTerm key={termIndex}>{term}</DescriptionListTerm>
          ))}
          {details.length > 0 ? (
            details.map((detail, detailIndex) => (
              <DescriptionListDetails key={detailIndex}>
                {detail}
              </DescriptionListDetails>
            ))
          ) : (
            <DescriptionListDetails />
          )}
        </DescriptionListSet>
      );
    })}
  </PasteDescriptionList>
);

DescriptionList.displayName = "DescriptionList";
