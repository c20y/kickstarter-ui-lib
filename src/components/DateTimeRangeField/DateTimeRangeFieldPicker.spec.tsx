import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { DateTimeRangePickerField } from "./DateTimeRangeFieldPicker";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  startDateId: "start-date",
  startTimeId: "start-time",
  endDateId: "end-date",
  endTimeId: "end-time",
};

describe("DateTimeRangePickerField", () => {
  describe("renders correctly", () => {
    it("renders 2 date inputs and 2 time inputs", () => {
      renderWithTheme(<DateTimeRangePickerField {...defaultProps} />);
      const dateInputs = screen
        .getAllByDisplayValue("")
        .filter((el) => el.getAttribute("type") === "date");
      const timeInputs = screen
        .getAllByDisplayValue("")
        .filter((el) => el.getAttribute("type") === "time");
      expect(dateInputs).toHaveLength(2);
      expect(timeInputs).toHaveLength(2);
    });

    it("uses default labels Start date, Start time, End date, End time", () => {
      renderWithTheme(<DateTimeRangePickerField {...defaultProps} />);
      expect(screen.getByLabelText("Start date")).toBeInTheDocument();
      expect(screen.getByLabelText("Start time")).toBeInTheDocument();
      expect(screen.getByLabelText("End date")).toBeInTheDocument();
      expect(screen.getByLabelText("End time")).toBeInTheDocument();
    });

    it("uses custom labels when provided", () => {
      renderWithTheme(
        <DateTimeRangePickerField
          {...defaultProps}
          startDateLabel="Check-in date"
          startTimeLabel="Check-in time"
          endDateLabel="Check-out date"
          endTimeLabel="Check-out time"
        />,
      );
      expect(screen.getByLabelText("Check-in date")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-in time")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-out date")).toBeInTheDocument();
      expect(screen.getByLabelText("Check-out time")).toBeInTheDocument();
    });

    it("applies IDs to the correct date inputs", () => {
      renderWithTheme(<DateTimeRangePickerField {...defaultProps} />);
      expect(screen.getByLabelText("Start date")).toHaveAttribute(
        "id",
        "start-date",
      );
      expect(screen.getByLabelText("End date")).toHaveAttribute(
        "id",
        "end-date",
      );
    });

    it("applies IDs to the correct time inputs", () => {
      renderWithTheme(<DateTimeRangePickerField {...defaultProps} />);
      expect(screen.getByLabelText("Start time")).toHaveAttribute(
        "id",
        "start-time",
      );
      expect(screen.getByLabelText("End time")).toHaveAttribute(
        "id",
        "end-time",
      );
    });
  });

  describe("error text", () => {
    it("shows startDateErrorText on the start date field", () => {
      renderWithTheme(
        <DateTimeRangePickerField
          {...defaultProps}
          startDateErrorText="Start date is required."
        />,
      );
      expect(screen.getByText("Start date is required.")).toBeInTheDocument();
    });

    it("shows startTimeErrorText on the start time field", () => {
      renderWithTheme(
        <DateTimeRangePickerField
          {...defaultProps}
          startTimeErrorText="Start time is required."
        />,
      );
      expect(screen.getByText("Start time is required.")).toBeInTheDocument();
    });

    it("shows endDateErrorText on the end date field", () => {
      renderWithTheme(
        <DateTimeRangePickerField
          {...defaultProps}
          endDateErrorText="End date is required."
        />,
      );
      expect(screen.getByText("End date is required.")).toBeInTheDocument();
    });

    it("shows endTimeErrorText on the end time field", () => {
      renderWithTheme(
        <DateTimeRangePickerField
          {...defaultProps}
          endTimeErrorText="End time is required."
        />,
      );
      expect(screen.getByText("End time is required.")).toBeInTheDocument();
    });
  });

  describe("help text", () => {
    it("shows helpText on the end time field only", () => {
      renderWithTheme(
        <DateTimeRangePickerField
          {...defaultProps}
          helpText="Select a booking window."
        />,
      );
      expect(screen.getByText("Select a booking window.")).toBeInTheDocument();
    });
  });

  describe("prop forwarding", () => {
    it("disables all 4 inputs when disabled is true", () => {
      renderWithTheme(<DateTimeRangePickerField {...defaultProps} disabled />);
      expect(screen.getByLabelText("Start date")).toBeDisabled();
      expect(screen.getByLabelText("Start time")).toBeDisabled();
      expect(screen.getByLabelText("End date")).toBeDisabled();
      expect(screen.getByLabelText("End time")).toBeDisabled();
    });

    it("marks all 4 inputs as required when required is true", () => {
      renderWithTheme(<DateTimeRangePickerField {...defaultProps} required />);
      expect(screen.getByLabelText("Start date")).toBeRequired();
      expect(screen.getByLabelText("Start time")).toBeRequired();
      expect(screen.getByLabelText("End date")).toBeRequired();
      expect(screen.getByLabelText("End time")).toBeRequired();
    });
  });

  describe("date constraint wiring", () => {
    it("sets end date min to startDateValue when startDateValue is provided", () => {
      renderWithTheme(
        <DateTimeRangePickerField
          {...defaultProps}
          startDateValue="2025-06-01"
        />,
      );
      expect(screen.getByLabelText("End date")).toHaveAttribute(
        "min",
        "2025-06-01",
      );
    });

    it("sets start date max to endDateValue when endDateValue is provided", () => {
      renderWithTheme(
        <DateTimeRangePickerField
          {...defaultProps}
          endDateValue="2025-06-30"
        />,
      );
      expect(screen.getByLabelText("Start date")).toHaveAttribute(
        "max",
        "2025-06-30",
      );
    });

    it("forwards overall min to start date and overall max to end date", () => {
      renderWithTheme(
        <DateTimeRangePickerField
          {...defaultProps}
          min="2025-01-01"
          max="2025-12-31"
        />,
      );
      expect(screen.getByLabelText("Start date")).toHaveAttribute(
        "min",
        "2025-01-01",
      );
      expect(screen.getByLabelText("End date")).toHaveAttribute(
        "max",
        "2025-12-31",
      );
    });
  });
});
