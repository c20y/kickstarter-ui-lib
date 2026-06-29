import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { TimeFieldPicker } from "./TimeFieldPicker";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  id: "start-time",
  label: "Start time",
};

describe("TimeFieldPicker", () => {
  describe("renders correctly", () => {
    it("renders an input with the correct id", () => {
      renderWithTheme(<TimeFieldPicker {...defaultProps} />);
      expect(screen.getByLabelText("Start time")).toHaveAttribute(
        "id",
        "start-time",
      );
    });

    it("renders the label and associates it with the input", () => {
      renderWithTheme(<TimeFieldPicker {...defaultProps} />);
      expect(screen.getByText("Start time")).toBeInTheDocument();
      expect(screen.getByLabelText("Start time")).toBeInTheDocument();
    });

    it("input type is time", () => {
      renderWithTheme(<TimeFieldPicker {...defaultProps} />);
      expect(screen.getByLabelText("Start time")).toHaveAttribute(
        "type",
        "time",
      );
    });
  });

  describe("help / error text", () => {
    it("renders helpText and sets aria-describedby", () => {
      renderWithTheme(
        <TimeFieldPicker {...defaultProps} helpText="Select a start time." />,
      );
      expect(screen.getByText("Select a start time.")).toBeInTheDocument();
      expect(screen.getByLabelText("Start time")).toHaveAttribute(
        "aria-describedby",
        "start-time-help",
      );
    });

    it("renders errorText and sets aria-describedby", () => {
      renderWithTheme(
        <TimeFieldPicker
          {...defaultProps}
          errorText="Start time is required."
        />,
      );
      expect(screen.getByText("Start time is required.")).toBeInTheDocument();
      expect(screen.getByLabelText("Start time")).toHaveAttribute(
        "aria-describedby",
        "start-time-help",
      );
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <TimeFieldPicker
          {...defaultProps}
          helpText="Select a start time."
          errorText="Start time is required."
        />,
      );
      expect(screen.getByText("Start time is required.")).toBeInTheDocument();
      expect(
        screen.queryByText("Select a start time."),
      ).not.toBeInTheDocument();
    });

    it("does not set aria-describedby when neither helpText nor errorText given", () => {
      renderWithTheme(<TimeFieldPicker {...defaultProps} />);
      expect(
        screen.getByLabelText("Start time").getAttribute("aria-describedby"),
      ).toBeNull();
    });
  });

  describe("error state", () => {
    it("sets aria-invalid when errorText is provided", () => {
      renderWithTheme(
        <TimeFieldPicker
          {...defaultProps}
          errorText="Start time is required."
        />,
      );
      expect(screen.getByLabelText("Start time")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("does not set aria-invalid when only helpText is provided", () => {
      renderWithTheme(
        <TimeFieldPicker {...defaultProps} helpText="Select a start time." />,
      );
      expect(screen.getByLabelText("Start time")).not.toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });
  });

  describe("prop forwarding", () => {
    it("disables the input when disabled is true", () => {
      renderWithTheme(<TimeFieldPicker {...defaultProps} disabled />);
      expect(screen.getByLabelText("Start time")).toBeDisabled();
    });

    it("marks the input as required when required is true", () => {
      renderWithTheme(<TimeFieldPicker {...defaultProps} required />);
      expect(screen.getByLabelText("Start time")).toBeRequired();
    });

    it("forwards ref to the underlying HTMLInputElement", () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<TimeFieldPicker {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.id).toBe("start-time");
    });
  });

  describe("time constraints", () => {
    it("forwards the min attribute to the input", () => {
      renderWithTheme(<TimeFieldPicker {...defaultProps} min="09:00" />);
      expect(screen.getByLabelText("Start time")).toHaveAttribute(
        "min",
        "09:00",
      );
    });

    it("forwards the max attribute to the input", () => {
      renderWithTheme(<TimeFieldPicker {...defaultProps} max="17:00" />);
      expect(screen.getByLabelText("Start time")).toHaveAttribute(
        "max",
        "17:00",
      );
    });
  });
});
