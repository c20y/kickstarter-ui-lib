import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Theme } from "@twilio-paste/core/theme";
import { Slider } from "./Slider";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  id: "volume",
  label: "Volume",
};

describe("Slider", () => {
  describe("renders correctly", () => {
    it("renders the label and associates it with the slider", () => {
      renderWithTheme(<Slider {...defaultProps} />);
      expect(screen.getByText("Volume")).toBeInTheDocument();
      expect(screen.getByLabelText("Volume")).toBeInTheDocument();
    });

    it("renders the min and max range labels by default", () => {
      renderWithTheme(<Slider {...defaultProps} minValue={0} maxValue={100} />);
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("hides the range labels when hideRangeLabels is set", () => {
      renderWithTheme(
        <Slider
          {...defaultProps}
          minValue={0}
          maxValue={100}
          hideRangeLabels
        />,
      );
      expect(screen.queryByText("0")).not.toBeInTheDocument();
      expect(screen.queryByText("100")).not.toBeInTheDocument();
    });
  });

  describe("help / error text", () => {
    it("renders helpText and sets aria-describedby", () => {
      renderWithTheme(
        <Slider {...defaultProps} helpText="Adjust the playback volume." />,
      );
      expect(
        screen.getByText("Adjust the playback volume."),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Volume")).toHaveAttribute(
        "aria-describedby",
        "volume-help",
      );
    });

    it("renders errorText and sets aria-describedby", () => {
      renderWithTheme(
        <Slider {...defaultProps} errorText="Volume is required." />,
      );
      expect(screen.getByText("Volume is required.")).toBeInTheDocument();
      expect(screen.getByLabelText("Volume")).toHaveAttribute(
        "aria-describedby",
        "volume-help",
      );
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <Slider
          {...defaultProps}
          helpText="Adjust the playback volume."
          errorText="Volume is required."
        />,
      );
      expect(screen.getByText("Volume is required.")).toBeInTheDocument();
      expect(
        screen.queryByText("Adjust the playback volume."),
      ).not.toBeInTheDocument();
    });

    it("does not set aria-describedby when neither helpText nor errorText given", () => {
      renderWithTheme(<Slider {...defaultProps} />);
      expect(
        screen.getByLabelText("Volume").getAttribute("aria-describedby"),
      ).toBeNull();
    });
  });

  describe("prop forwarding", () => {
    it("disables the slider when disabled is true", () => {
      renderWithTheme(<Slider {...defaultProps} disabled />);
      expect(screen.getByLabelText("Volume")).toBeDisabled();
    });

    it("forwards ref to the underlying HTMLInputElement", () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<Slider {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByLabelText("Volume"));
    });
  });

  describe("value", () => {
    it("starts at defaultValue in uncontrolled mode", () => {
      renderWithTheme(
        <Slider {...defaultProps} minValue={0} maxValue={100} defaultValue={40} />,
      );
      expect(screen.getByLabelText("Volume")).toHaveValue("40");
    });

    it("reflects a controlled value", () => {
      renderWithTheme(
        <Slider
          {...defaultProps}
          minValue={0}
          maxValue={100}
          value={70}
          onChange={() => {}}
        />,
      );
      expect(screen.getByLabelText("Volume")).toHaveValue("70");
    });

    it("calls onChange with the incremented value on ArrowRight, respecting step", async () => {
      const onChange = vi.fn();
      renderWithTheme(
        <Slider
          {...defaultProps}
          minValue={0}
          maxValue={100}
          step={5}
          value={50}
          onChange={onChange}
        />,
      );
      const slider = screen.getByLabelText("Volume");
      slider.focus();
      await userEvent.keyboard("{ArrowRight}");
      expect(onChange).toHaveBeenCalledWith(55);
    });

    it("calls onChange with the decremented value on ArrowLeft, respecting step", async () => {
      const onChange = vi.fn();
      renderWithTheme(
        <Slider
          {...defaultProps}
          minValue={0}
          maxValue={100}
          step={5}
          value={50}
          onChange={onChange}
        />,
      );
      const slider = screen.getByLabelText("Volume");
      slider.focus();
      await userEvent.keyboard("{ArrowLeft}");
      expect(onChange).toHaveBeenCalledWith(45);
    });
  });
});
