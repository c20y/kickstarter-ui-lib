import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "storybook/test";
import { Button } from "@twilio-paste/core/button";
import { Stack } from "@twilio-paste/core/stack";
import { Text } from "@twilio-paste/core/text";
import { AlertDialog } from "./AlertDialog";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  args: {
    trigger: "Delete project",
    heading: "Delete project",
    children:
      "Are you sure you want to delete this project? This action cannot be undone.",
    onConfirmLabel: "Delete",
    onDismissLabel: "Cancel",
    onConfirm: fn(),
    onDismiss: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    destructive: true,
  },
};

export const ConfirmDisabled: Story = {
  name: "Confirm disabled",
  args: {
    // Paste's AlertDialog only renders the confirm button as disabled when
    // `destructive` is also true - `isConfirmDisabled` alone has no effect.
    destructive: true,
    isConfirmDisabled: true,
  },
};

export const Controlled: Story = {
  name: "Controlled (external open)",
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack orientation="vertical" spacing="space50">
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          Open from elsewhere
        </Button>
        <Text as="p" fontSize="fontSize20" color="colorTextWeak">
          State: {isOpen ? "open" : "closed"}
        </Text>
        <AlertDialog {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
      </Stack>
    );
  },
};

export const Interaction: Story = {
  name: "Interaction: open, confirm",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Delete project" });
    await userEvent.click(trigger);

    const dialog = await canvas.findByRole("alertdialog");
    await expect(
      within(dialog).getByText("Delete project"),
    ).toBeInTheDocument();

    const confirmButton = within(dialog).getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(confirmButton);
  },
};
