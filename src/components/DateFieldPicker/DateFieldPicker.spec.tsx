import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { DateFieldPicker } from "./DateFieldPicker";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  id: "start-date",
  label: "Start date",
};

describe("DateFieldPicker", () => {
  describe("renders correctly", () => {
    it("renders an input with the correct id", () => {
      renderWithTheme(<DateFieldPicker {...defaultProps} />);
      expect(screen.getByLabelText("Start date")).toHaveAttribute("id", "start-date");
    });

    it("renders the label and associates it with the input", () => {
      renderWithTheme(<DateFieldPicker {...defaultProps} />);
      expect(screen.getByText("Start date")).toBeInTheDocument();
      expect(screen.getByLabelText("Start date")).toBeInTheDocument();
    });

    it("input type is date", () => {
      renderWithTheme(<DateFieldPicker {...defaultProps} />);
      expect(screen.getByLabelText("Start date")).toHaveAttribute("type", "date");
    });
  });

  describe("help / error text", () => {
    it("renders helpText and sets aria-describedby", () => {
      renderWithTheme(
        <DateFieldPicker {...defaultProps} helpText="Select a start date." />,
      );
      expect(screen.getByText("Select a start date.")).toBeInTheDocument();
      expect(screen.getByLabelText("Start date")).toHaveAttribute(
        "aria-describedby",
        "start-date-help",
      );
    });

    it("renders errorText and sets aria-describedby", () => {
      renderWithTheme(
        <DateFieldPicker {...defaultProps} errorText="Start date is required." />,
      );
      expect(screen.getByText("Start date is required.")).toBeInTheDocument();
      expect(screen.getByLabelText("Start date")).toHaveAttribute(
        "aria-describedby",
        "start-date-help",
      );
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <DateFieldPicker
          {...defaultProps}
          helpText="Select a start date."
          errorText="Start date is required."
        />,
      );
      expect(screen.getByText("Start date is required.")).toBeInTheDocument();
      expect(screen.queryByText("Select a start date.")).not.toBeInTheDocument();
    });

    it("does not set aria-describedby when neither helpText nor errorText given", () => {
      renderWithTheme(<DateFieldPicker {...defaultProps} />);
      expect(
        screen.getByLabelText("Start date").getAttribute("aria-describedby"),
      ).toBeNull();
    });
  });

  describe("error state", () => {
    it("sets aria-invalid when errorText is provided", () => {
      renderWithTheme(
        <DateFieldPicker {...defaultProps} errorText="Start date is required." />,
      );
      expect(screen.getByLabelText("Start date")).toHaveAttribute("aria-invalid", "true");
    });

    it("does not set aria-invalid when only helpText is provided", () => {
      renderWithTheme(
        <DateFieldPicker {...defaultProps} helpText="Select a start date." />,
      );
      expect(screen.getByLabelText("Start date")).not.toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("prop forwarding", () => {
    it("disables the input when disabled is true", () => {
      renderWithTheme(<DateFieldPicker {...defaultProps} disabled />);
      expect(screen.getByLabelText("Start date")).toBeDisabled();
    });

    it("marks the input as required when required is true", () => {
      renderWithTheme(<DateFieldPicker {...defaultProps} required />);
      expect(screen.getByLabelText("Start date")).toBeRequired();
    });

    it("forwards ref to the underlying HTMLInputElement", () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<DateFieldPicker {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.id).toBe("start-date");
    });
  });

  describe("date constraints", () => {
    it("forwards the min attribute to the input", () => {
      renderWithTheme(<DateFieldPicker {...defaultProps} min="2025-01-01" />);
      expect(screen.getByLabelText("Start date")).toHaveAttribute("min", "2025-01-01");
    });

    it("forwards the max attribute to the input", () => {
      renderWithTheme(<DateFieldPicker {...defaultProps} max="2025-12-31" />);
      expect(screen.getByLabelText("Start date")).toHaveAttribute("max", "2025-12-31");
    });
  });
});
