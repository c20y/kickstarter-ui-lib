import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "storybook/test";
import { Text } from "@twilio-paste/core/text";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    id: "volume",
    label: "Volume",
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: "Adjust the playback volume.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "Volume is required.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 30,
  },
};

export const CustomRange: Story = {
  name: "Custom range",
  args: {
    id: "brightness",
    label: "Brightness",
    minValue: 0,
    maxValue: 11,
    step: 1,
    defaultValue: 5,
  },
};

export const HiddenRangeLabels: Story = {
  name: "Hidden range labels",
  args: {
    hideRangeLabels: true,
    defaultValue: 50,
  },
};

export const DefaultValue: Story = {
  name: "Uncontrolled (defaultValue)",
  args: {
    defaultValue: 65,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return (
      <>
        <Slider {...args} value={value} onChange={setValue} />
        <Text as="p" fontSize="fontSize20" color="colorTextWeak" marginTop="space40">
          Current value: {value}
        </Text>
      </>
    );
  },
};

export const Interaction: Story = {
  name: "Interaction: keyboard drag",
  args: {
    defaultValue: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByLabelText("Volume");
    slider.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(slider).toHaveValue("51");
  },
};
