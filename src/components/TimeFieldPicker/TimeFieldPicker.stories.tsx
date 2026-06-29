import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "storybook/test";
import { TimeFieldPicker } from "./TimeFieldPicker";

const meta: Meta<typeof TimeFieldPicker> = {
  title: "Components/TimeFieldPicker",
  component: TimeFieldPicker,
  tags: ["autodocs"],
  args: {
    id: "time-field",
    label: "Time",
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof TimeFieldPicker>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: "Select a time.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "Please select a valid time.",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Optional: Story = {
  args: {
    labelOptional: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "09:00",
  },
};

export const Inverse: Story = {
  args: {
    variant: "inverse",
    helpText: "Used on dark backgrounds within a light theme.",
  },
  parameters: {
    pasteTheme: "default",
  },
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: "#1a1a2e", padding: "2rem", borderRadius: 8 }}
      >
        <Story />
      </div>
    ),
  ],
};

export const PickTime: Story = {
  name: "Interaction: pick a time",
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <TimeFieldPicker
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    id: "interaction-time",
    label: "Start time",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/start time/i);
    await userEvent.fill(input, "09:30");
    await expect(input).toHaveValue("09:30");
  },
};
