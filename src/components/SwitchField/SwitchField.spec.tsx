import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { SwitchField } from "./SwitchField";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  id: "enable-notifications",
  label: "Enable notifications",
};

describe("SwitchField", () => {
  describe("renders correctly", () => {
    it("renders a control with role switch", () => {
      renderWithTheme(<SwitchField {...defaultProps} />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("renders the label text", () => {
      renderWithTheme(<SwitchField {...defaultProps} />);
      expect(screen.getByText("Enable notifications")).toBeInTheDocument();
    });
  });

  describe("help text", () => {
    it("renders helpText content in the DOM", () => {
      renderWithTheme(
        <SwitchField {...defaultProps} helpText="You can change this later." />,
      );
      expect(
        screen.getByText("You can change this later."),
      ).toBeInTheDocument();
    });

    it("does not render help text when neither helpText nor errorText is given", () => {
      renderWithTheme(<SwitchField {...defaultProps} />);
      expect(screen.queryByText(/you can change/i)).not.toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("renders errorText content in the DOM", () => {
      renderWithTheme(
        <SwitchField
          {...defaultProps}
          errorText="You must accept to continue."
        />,
      );
      expect(
        screen.getByText("You must accept to continue."),
      ).toBeInTheDocument();
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <SwitchField
          {...defaultProps}
          helpText="You can change this later."
          errorText="You must accept to continue."
        />,
      );
      expect(
        screen.getByText("You must accept to continue."),
      ).toBeInTheDocument();
      expect(
        screen.queryByText("You can change this later."),
      ).not.toBeInTheDocument();
    });
  });

  describe("prop forwarding", () => {
    it("disables the switch when disabled is true", () => {
      renderWithTheme(<SwitchField {...defaultProps} disabled />);
      expect(screen.getByRole("switch")).toBeDisabled();
    });

    it("is checked when defaultChecked is true", () => {
      renderWithTheme(<SwitchField {...defaultProps} defaultChecked />);
      expect(screen.getByRole("switch")).toBeChecked();
    });

    it("is not checked by default", () => {
      renderWithTheme(<SwitchField {...defaultProps} />);
      expect(screen.getByRole("switch")).not.toBeChecked();
    });

    it("forwards ref to the underlying input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<SwitchField {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });
});
