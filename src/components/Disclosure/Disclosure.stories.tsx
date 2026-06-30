import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@twilio-paste/core/button";
import { Stack } from "@twilio-paste/core/stack";
import { Text } from "@twilio-paste/core/text";
import { Disclosure, useDisclosureState } from "./Disclosure";

const meta: Meta<typeof Disclosure> = {
  title: "Components/Disclosure",
  component: Disclosure,
  tags: ["autodocs"],
  args: {
    heading: "What is Twilio Flex?",
    children:
      "Twilio Flex is a programmable cloud contact center platform that gives you complete control over your contact center experience.",
  },
};
export default meta;

type Story = StoryObj<typeof Disclosure>;

export const Default: Story = {};

export const DefaultExpanded: Story = {
  args: { defaultVisible: true },
};

export const Contained: Story = {
  args: { variant: "contained", defaultVisible: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Controlled: Story = {
  render: (args) => {
    const state = useDisclosureState({ visible: false });
    return (
      <Stack orientation="vertical" spacing="space50">
        <Button variant="secondary" onClick={state.toggle}>
          Toggle disclosure
        </Button>
        <Text as="p" fontSize="fontSize20" color="colorTextWeak">
          State: {state.visible ? "open" : "closed"}
        </Text>
        <Disclosure {...args} state={state} />
      </Stack>
    );
  },
};
