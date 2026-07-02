import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Theme } from "@twilio-paste/core/theme";
import { AlertDialog } from "./AlertDialog";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  trigger: "Delete project",
  heading: "Delete project",
  children: "Are you sure you want to delete this project?",
  onConfirmLabel: "Delete",
  onDismissLabel: "Cancel",
  onConfirm: vi.fn(),
};

const openDialog = async () => {
  await userEvent.click(
    screen.getByRole("button", { name: "Delete project" }),
  );
  return screen.findByRole("alertdialog");
};

describe("AlertDialog", () => {
  describe("uncontrolled (default)", () => {
    it("renders the trigger button", () => {
      renderWithTheme(<AlertDialog {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: "Delete project" }),
      ).toBeInTheDocument();
    });

    it("does not render the dialog before the trigger is clicked", () => {
      renderWithTheme(<AlertDialog {...defaultProps} />);
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("opens the dialog when the trigger is clicked", async () => {
      renderWithTheme(<AlertDialog {...defaultProps} />);
      const dialog = await openDialog();
      expect(
        within(dialog).getByText("Are you sure you want to delete this project?"),
      ).toBeInTheDocument();
    });

    it("closes the dialog when confirm is clicked", async () => {
      renderWithTheme(<AlertDialog {...defaultProps} />);
      const dialog = await openDialog();
      await userEvent.click(
        within(dialog).getByRole("button", { name: "Delete" }),
      );
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("closes the dialog when cancel is clicked", async () => {
      renderWithTheme(<AlertDialog {...defaultProps} />);
      const dialog = await openDialog();
      await userEvent.click(
        within(dialog).getByRole("button", { name: "Cancel" }),
      );
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });

  describe("callbacks", () => {
    it("calls onConfirm when the confirm button is clicked", async () => {
      const onConfirm = vi.fn();
      renderWithTheme(
        <AlertDialog {...defaultProps} onConfirm={onConfirm} />,
      );
      const dialog = await openDialog();
      await userEvent.click(
        within(dialog).getByRole("button", { name: "Delete" }),
      );
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it("calls onDismiss when the cancel button is clicked", async () => {
      const onDismiss = vi.fn();
      renderWithTheme(
        <AlertDialog {...defaultProps} onDismiss={onDismiss} />,
      );
      const dialog = await openDialog();
      await userEvent.click(
        within(dialog).getByRole("button", { name: "Cancel" }),
      );
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("controlled (isOpen + onOpenChange)", () => {
    it("renders open when isOpen is true, without needing the trigger click", async () => {
      renderWithTheme(<AlertDialog {...defaultProps} isOpen />);
      expect(await screen.findByRole("alertdialog")).toBeInTheDocument();
    });

    it("calls onOpenChange(true) when the trigger is clicked", async () => {
      const onOpenChange = vi.fn();
      renderWithTheme(
        <AlertDialog
          {...defaultProps}
          isOpen={false}
          onOpenChange={onOpenChange}
        />,
      );
      await userEvent.click(
        screen.getByRole("button", { name: "Delete project" }),
      );
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("calls onOpenChange(false) on confirm, but leaves isOpen under caller control", async () => {
      const onOpenChange = vi.fn();
      renderWithTheme(
        <AlertDialog {...defaultProps} isOpen onOpenChange={onOpenChange} />,
      );
      const dialog = await screen.findByRole("alertdialog");
      await userEvent.click(
        within(dialog).getByRole("button", { name: "Delete" }),
      );
      expect(onOpenChange).toHaveBeenCalledWith(false);
      // still open - the controlled `isOpen` prop hasn't changed, since the
      // caller owns that state rather than the component.
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    });
  });

  describe("destructive variant", () => {
    it("does not disable the confirm button from isConfirmDisabled alone", async () => {
      renderWithTheme(<AlertDialog {...defaultProps} isConfirmDisabled />);
      const dialog = await openDialog();
      expect(
        within(dialog).getByRole("button", { name: "Delete" }),
      ).toBeEnabled();
    });

    it("disables the confirm button when isConfirmDisabled and destructive are both set", async () => {
      renderWithTheme(
        <AlertDialog {...defaultProps} destructive isConfirmDisabled />,
      );
      const dialog = await openDialog();
      expect(
        within(dialog).getByRole("button", { name: "Delete" }),
      ).toBeDisabled();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the underlying dialog element", async () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(<AlertDialog {...defaultProps} isOpen ref={ref} />);
      const dialog = await screen.findByRole("alertdialog");
      expect(ref.current).toBe(dialog);
    });
  });
});
