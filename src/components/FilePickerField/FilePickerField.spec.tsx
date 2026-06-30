import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { FilePickerField } from "./FilePickerField";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  id: "upload",
  label: "Profile photo",
};

describe("FilePickerField", () => {
  describe("renders correctly", () => {
    it("renders an input with the correct id", () => {
      renderWithTheme(<FilePickerField {...defaultProps} />);
      expect(screen.getByLabelText("Profile photo")).toHaveAttribute("id", "upload");
    });

    it("renders the label and associates it with the input", () => {
      renderWithTheme(<FilePickerField {...defaultProps} />);
      expect(screen.getByText("Profile photo")).toBeInTheDocument();
      expect(screen.getByLabelText("Profile photo")).toBeInTheDocument();
    });

    it("input type is file", () => {
      renderWithTheme(<FilePickerField {...defaultProps} />);
      expect(screen.getByLabelText("Profile photo")).toHaveAttribute("type", "file");
    });
  });

  describe("help / error text", () => {
    it("renders helpText in the DOM", () => {
      renderWithTheme(
        <FilePickerField {...defaultProps} helpText="Accepted formats: JPG, PNG." />,
      );
      expect(screen.getByText("Accepted formats: JPG, PNG.")).toBeInTheDocument();
    });

    it("renders errorText in the DOM", () => {
      renderWithTheme(
        <FilePickerField {...defaultProps} errorText="Please select a file." />,
      );
      expect(screen.getByText("Please select a file.")).toBeInTheDocument();
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <FilePickerField
          {...defaultProps}
          helpText="Accepted formats: JPG, PNG."
          errorText="Please select a file."
        />,
      );
      expect(screen.getByText("Please select a file.")).toBeInTheDocument();
      expect(screen.queryByText("Accepted formats: JPG, PNG.")).not.toBeInTheDocument();
    });

    it("renders no help text element when neither helpText nor errorText given", () => {
      renderWithTheme(<FilePickerField {...defaultProps} />);
      expect(screen.queryByText("Accepted formats: JPG, PNG.")).not.toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("sets aria-invalid when errorText is provided", () => {
      renderWithTheme(
        <FilePickerField {...defaultProps} errorText="Please select a file." />,
      );
      expect(screen.getByLabelText("Profile photo")).toHaveAttribute("aria-invalid", "true");
    });

    it("does not set aria-invalid when only helpText is provided", () => {
      renderWithTheme(
        <FilePickerField {...defaultProps} helpText="Accepted formats: JPG, PNG." />,
      );
      expect(screen.getByLabelText("Profile photo")).not.toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("prop forwarding", () => {
    it("disables the input when disabled is true", () => {
      renderWithTheme(<FilePickerField {...defaultProps} disabled />);
      expect(screen.getByLabelText("Profile photo")).toBeDisabled();
    });

    it("marks the input as required when required is true", () => {
      renderWithTheme(<FilePickerField {...defaultProps} required />);
      expect(screen.getByLabelText("Profile photo")).toBeRequired();
    });

    it("forwards the accept attribute to the input", () => {
      renderWithTheme(<FilePickerField {...defaultProps} accept="image/*" />);
      expect(screen.getByLabelText("Profile photo")).toHaveAttribute("accept", "image/*");
    });

    it("renders without error when a non-default buttonVariant is provided", () => {
      renderWithTheme(
        <FilePickerField {...defaultProps} buttonVariant="primary" />,
      );
      expect(screen.getByText("Choose file")).toBeInTheDocument();
    });

    it("forwards ref to the underlying HTMLInputElement", () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<FilePickerField {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.id).toBe("upload");
    });
  });
});
