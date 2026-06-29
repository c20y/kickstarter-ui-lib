import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { TextareaField } from "./TextAreaField";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  id: "bio",
  label: "Bio",
};

describe("TextareaField", () => {
  describe("renders correctly", () => {
    it("renders a textarea with the correct id", () => {
      renderWithTheme(<TextareaField {...defaultProps} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "bio");
    });

    it("renders the label and associates it with the textarea", () => {
      renderWithTheme(<TextareaField {...defaultProps} />);
      const label = screen.getByText("Bio");
      expect(label).toBeInTheDocument();
      expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    });
  });

  describe("help text", () => {
    it("renders helpText content", () => {
      renderWithTheme(
        <TextareaField {...defaultProps} helpText="Max 300 characters." />,
      );
      expect(screen.getByText("Max 300 characters.")).toBeInTheDocument();
    });

    it("sets aria-describedby to ${id}-help when helpText is provided", () => {
      renderWithTheme(
        <TextareaField {...defaultProps} helpText="Some help." />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "bio-help",
      );
    });

    it("does not render a help node when neither helpText nor errorText is given", () => {
      renderWithTheme(<TextareaField {...defaultProps} />);
      expect(screen.queryByRole("textbox")?.getAttribute("aria-describedby")).toBeNull();
    });
  });

  describe("error state", () => {
    it("renders errorText content", () => {
      renderWithTheme(
        <TextareaField {...defaultProps} errorText="This field is required." />,
      );
      expect(screen.getByText("This field is required.")).toBeInTheDocument();
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <TextareaField
          {...defaultProps}
          helpText="Some help."
          errorText="Something went wrong."
        />,
      );
      expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
      expect(screen.queryByText("Some help.")).not.toBeInTheDocument();
    });

    it("sets aria-invalid when errorText is provided", () => {
      renderWithTheme(
        <TextareaField {...defaultProps} errorText="Required." />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("does not set aria-invalid when only helpText is provided", () => {
      renderWithTheme(
        <TextareaField {...defaultProps} helpText="Some help." />,
      );
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid", "true");
    });

    it("sets aria-describedby to ${id}-help when errorText is provided", () => {
      renderWithTheme(
        <TextareaField {...defaultProps} errorText="Required." />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "bio-help",
      );
    });
  });

  describe("prop forwarding", () => {
    it("disables the textarea when disabled is true", () => {
      renderWithTheme(<TextareaField {...defaultProps} disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("marks the textarea as required when required is true", () => {
      renderWithTheme(<TextareaField {...defaultProps} required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });

    it("makes the textarea read-only when readOnly is true", () => {
      renderWithTheme(<TextareaField {...defaultProps} readOnly />);
      expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    });

    it("forwards ref to the underlying textarea element", () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      renderWithTheme(<TextareaField {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current?.id).toBe("bio");
    });
  });
});
