import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  args: {
    id: "upload-progress",
    label: "Uploading…",
    value: 50,
  },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const WithValueLabel: Story = {
  args: {
    value: 3,
    maxValue: 5,
    valueLabel: "3 of 5 files",
  },
};

export const WithHelpText: Story = {
  args: {
    helpText: "This may take a few minutes.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "Upload failed. Try again.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Connecting…",
    isIndeterminate: true,
  },
};

export const CustomMax: Story = {
  name: "Custom max value",
  args: {
    id: "storage-progress",
    label: "Storage used",
    value: 1259,
    maxValue: 1500,
    valueLabel: "1,259 MB of 1,500 MB",
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};
