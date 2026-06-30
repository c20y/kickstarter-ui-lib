import {
  Disclosure as PasteDisclosure,
  DisclosureHeading,
  DisclosureContent,
} from "@twilio-paste/core/disclosure";
import type { DisclosureStateReturn } from "@twilio-paste/core/disclosure";
import type { HeadingProps } from "@twilio-paste/core/heading";

export { useDisclosureState } from "@twilio-paste/core/disclosure";

export interface DisclosureProps {
  heading: NonNullable<React.ReactNode>;
  headingAs?: HeadingProps["as"];
  headingVariant?: HeadingProps["variant"];
  variant?: "default" | "contained";
  defaultVisible?: boolean;
  state?: DisclosureStateReturn;
  disabled?: boolean;
  children: NonNullable<React.ReactNode>;
}

export const Disclosure = ({
  heading,
  headingAs = "h2",
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
