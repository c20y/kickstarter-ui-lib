import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { ProgressBar } from "./ProgressBar";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  id: "upload-progress",
  label: "Uploading…",
};

describe("ProgressBar", () => {
  describe("renders correctly", () => {
    it("renders the label and associates it with the progress bar", () => {
      renderWithTheme(<ProgressBar {...defaultProps} value={50} />);
      expect(screen.getByText("Uploading…")).toBeInTheDocument();
      expect(screen.getByLabelText("Uploading…")).toBeInTheDocument();
    });

    it("renders with role progressbar", () => {
      renderWithTheme(<ProgressBar {...defaultProps} value={50} />);
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("value representation", () => {
    it("sets aria-valuenow/min/max from value/maxValue", () => {
      renderWithTheme(
        <ProgressBar {...defaultProps} value={30} maxValue={200} />,
      );
      const bar = screen.getByRole("progressbar");
      expect(bar).toHaveAttribute("aria-valuenow", "30");
      expect(bar).toHaveAttribute("aria-valuemin", "0");
      expect(bar).toHaveAttribute("aria-valuemax", "200");
    });

    it("defaults aria-valuetext to an auto-computed percentage when valueLabel is omitted", () => {
      renderWithTheme(<ProgressBar {...defaultProps} value={50} />);
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-valuetext",
        "50%",
      );
    });

    it("syncs a custom valueLabel into both the visible text and aria-valuetext", () => {
      renderWithTheme(
        <ProgressBar
          {...defaultProps}
          value={3}
          maxValue={5}
          valueLabel="3 of 5 files"
        />,
      );
      expect(screen.getByText("3 of 5 files")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-valuetext",
        "3 of 5 files",
      );
    });
  });

  describe("help / error text", () => {
    it("renders helpText and sets aria-describedby", () => {
      renderWithTheme(
        <ProgressBar
          {...defaultProps}
          value={50}
          helpText="This may take a few minutes."
        />,
      );
      expect(
        screen.getByText("This may take a few minutes."),
      ).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-describedby",
        "upload-progress-help",
      );
    });

    it("renders errorText and sets aria-describedby", () => {
      renderWithTheme(
        <ProgressBar {...defaultProps} value={50} errorText="Upload failed." />,
      );
      expect(screen.getByText("Upload failed.")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-describedby",
        "upload-progress-help",
      );
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <ProgressBar
          {...defaultProps}
          value={50}
          helpText="This may take a few minutes."
          errorText="Upload failed."
        />,
      );
      expect(screen.getByText("Upload failed.")).toBeInTheDocument();
      expect(
        screen.queryByText("This may take a few minutes."),
      ).not.toBeInTheDocument();
    });

    it("does not set aria-describedby when neither helpText nor errorText given", () => {
      renderWithTheme(<ProgressBar {...defaultProps} value={50} />);
      expect(
        screen.getByRole("progressbar").getAttribute("aria-describedby"),
      ).toBeNull();
    });
  });

  describe("indeterminate", () => {
    it("has no aria-valuenow when isIndeterminate is set", () => {
      renderWithTheme(<ProgressBar {...defaultProps} isIndeterminate />);
      expect(screen.getByRole("progressbar")).not.toHaveAttribute(
        "aria-valuenow",
      );
    });
  });

  describe("prop forwarding", () => {
    it("forwards ref to the underlying HTMLDivElement", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(<ProgressBar {...defaultProps} value={50} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByRole("progressbar"));
    });
  });
});
