import {
  Disclosure as PasteDisclosure,
  DisclosureHeading,
  DisclosureContent,
} from "@twilio-paste/core/disclosure";
import type { DisclosureProps } from "./types";
export { useDisclosureState } from "@twilio-paste/core/disclosure";

export const Disclosure = ({
  heading,
  headingAs,
  headingVariant = "heading30",
  variant = "default",
  defaultVisible,
  state,
  disabled,
  children,
}: DisclosureProps) => (
  <PasteDisclosure variant={variant} visible={defaultVisible} state={state}>
    <DisclosureHeading
      as={headingAs}
      variant={headingVariant}
      disabled={disabled}
    >
      {heading}
    </DisclosureHeading>
    <DisclosureContent>{children}</DisclosureContent>
  </PasteDisclosure>
);

Disclosure.displayName = "Disclosure";
