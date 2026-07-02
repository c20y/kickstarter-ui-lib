import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { DateRangeFieldPicker } from "./DateRangeFieldPicker";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  startId: "range-start",
  endId: "range-end",
};

describe("DateRangeFieldPicker", () => {
  describe("renders correctly", () => {
    it("renders both date inputs", () => {
      renderWithTheme(<DateRangeFieldPicker {...defaultProps} />);
      const inputs = screen.getAllByDisplayValue("").filter(
        (el) => el.getAttribute("type") === "date",
      );
      expect(inputs).toHaveLength(2);
    });

    it("uses default labels Start date and End date", () => {
      renderWithTheme(<DateRangeFieldPicker {...defaultProps} />);
      expect(screen.getByLabelText("Start date")).toBeInTheDocument();
      expect(screen.getByLabelText("End date")).toBeInTheDocument();
    });

    it("uses custom labels when provided", () => {
      renderWithTheme(
        <DateRangeFieldPicker
          {...defaultProps}
          startLabel="Check-in"
          endLabel="Check-out"
        />,
      );
      expect(screen.getByLabelText("Check-in")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-out")).toBeInTheDocument();
    });

    it("applies startId and endId to the correct inputs", () => {
      renderWithTheme(<DateRangeFieldPicker {...defaultProps} />);
      expect(screen.getByLabelText("Start date")).toHaveAttribute("id", "range-start");
      expect(screen.getByLabelText("End date")).toHaveAttribute("id", "range-end");
    });
  });

  describe("error text", () => {
    it("shows startErrorText on the start picker", () => {
      renderWithTheme(
        <DateRangeFieldPicker {...defaultProps} startErrorText="Start date is required." />,
      );
      expect(screen.getByText("Start date is required.")).toBeInTheDocument();
    });

    it("shows endErrorText on the end picker", () => {
      renderWithTheme(
        <DateRangeFieldPicker {...defaultProps} endErrorText="End date is required." />,
      );
      expect(screen.getByText("End date is required.")).toBeInTheDocument();
    });
  });

  describe("help text", () => {
    it("renders helpText once for the whole field group", () => {
      renderWithTheme(
        <DateRangeFieldPicker {...defaultProps} helpText="Select a date range." />,
      );
      expect(screen.getByText("Select a date range.")).toBeInTheDocument();
    });

    it("associates helpText with the fieldset via aria-describedby", () => {
      renderWithTheme(
        <DateRangeFieldPicker {...defaultProps} helpText="Select a date range." />,
      );
      const group = screen.getByRole("group");
      const description = screen.getByText("Select a date range.");
      expect(group).toHaveAttribute("aria-describedby", description.id);
    });

    it("renders no description when helpText is not provided", () => {
      renderWithTheme(<DateRangeFieldPicker {...defaultProps} />);
      expect(screen.queryByText("Select a date range.")).not.toBeInTheDocument();
    });
  });

  describe("prop forwarding", () => {
    it("disables both inputs when disabled is true", () => {
      renderWithTheme(<DateRangeFieldPicker {...defaultProps} disabled />);
      expect(screen.getByLabelText("Start date")).toBeDisabled();
      expect(screen.getByLabelText("End date")).toBeDisabled();
    });

    it("marks both inputs as required when required is true", () => {
      renderWithTheme(<DateRangeFieldPicker {...defaultProps} required />);
      expect(screen.getByLabelText("Start date")).toBeRequired();
      expect(screen.getByLabelText("End date")).toBeRequired();
    });
  });

  describe("constraint wiring", () => {
    it("sets end input min to startValue when startValue is provided", () => {
      renderWithTheme(
        <DateRangeFieldPicker {...defaultProps} startValue="2025-06-01" />,
      );
      expect(screen.getByLabelText("End date")).toHaveAttribute("min", "2025-06-01");
    });

    it("sets start input max to endValue when endValue is provided", () => {
      renderWithTheme(
        <DateRangeFieldPicker {...defaultProps} endValue="2025-06-30" />,
      );
      expect(screen.getByLabelText("Start date")).toHaveAttribute("max", "2025-06-30");
    });

    it("forwards overall min to the start input when no startValue", () => {
      renderWithTheme(
        <DateRangeFieldPicker {...defaultProps} min="2025-01-01" />,
      );
      expect(screen.getByLabelText("Start date")).toHaveAttribute("min", "2025-01-01");
    });

    it("forwards overall max to the end input when no endValue", () => {
      renderWithTheme(
        <DateRangeFieldPicker {...defaultProps} max="2025-12-31" />,
      );
      expect(screen.getByLabelText("End date")).toHaveAttribute("max", "2025-12-31");
    });
  });
});
