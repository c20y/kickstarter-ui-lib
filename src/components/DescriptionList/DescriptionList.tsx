import {
  DescriptionList as PasteDescriptionList,
  DescriptionListSet,
  DescriptionListTerm,
  DescriptionListDetails,
} from "@twilio-paste/core/description-list";
import type { DescriptionListProps } from "./types";

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
