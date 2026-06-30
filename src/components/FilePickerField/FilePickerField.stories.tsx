import type { Meta, StoryObj } from "@storybook/react";
import { FilePickerField } from "./FilePickerField";

const meta: Meta<typeof FilePickerField> = {
  title: "Components/FilePickerField",
  component: FilePickerField,
  tags: ["autodocs"],
  args: {
    id: "avatar",
    label: "Profile photo",
  },
};
export default meta;

type Story = StoryObj<typeof FilePickerField>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    helpText: "Accepted formats: JPG, PNG, GIF.",
  },
};

export const WithError: Story = {
  args: {
    errorText: "Please select a file.",
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
  },
};

export const PrimaryButton: Story = {
  args: {
    buttonVariant: "primary",
    helpText: "Click to upload a file.",
  },
};

export const AcceptImages: Story = {
  args: {
    accept: "image/*",
    helpText: "Images only (JPG, PNG, GIF, WebP).",
  },
};
