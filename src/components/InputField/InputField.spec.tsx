import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { InputField } from "./InputField";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  id: "username",
  label: "Username",
};

describe("InputField", () => {
  describe("renders correctly", () => {
    it("renders an input with the correct id", () => {
      renderWithTheme(<InputField {...defaultProps} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "username");
    });

    it("renders the label and associates it with the input", () => {
      renderWithTheme(<InputField {...defaultProps} />);
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    it("defaults to type text", () => {
      renderWithTheme(<InputField {...defaultProps} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    it("renders with a specified type", () => {
      renderWithTheme(<InputField {...defaultProps} id="qty" label="Quantity" type="number" />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
    });
  });

  describe("help / error text", () => {
    it("renders helpText and sets aria-describedby", () => {
      renderWithTheme(
        <InputField {...defaultProps} helpText="Enter your username." />,
      );
      expect(screen.getByText("Enter your username.")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "username-help",
      );
    });

    it("renders errorText and sets aria-describedby", () => {
      renderWithTheme(
        <InputField {...defaultProps} errorText="Username is required." />,
      );
      expect(screen.getByText("Username is required.")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "username-help",
      );
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <InputField
          {...defaultProps}
          helpText="Enter your username."
          errorText="Username is required."
        />,
      );
      expect(screen.getByText("Username is required.")).toBeInTheDocument();
      expect(screen.queryByText("Enter your username.")).not.toBeInTheDocument();
    });

    it("does not set aria-describedby when neither helpText nor errorText given", () => {
      renderWithTheme(<InputField {...defaultProps} />);
      expect(
        screen.getByRole("textbox").getAttribute("aria-describedby"),
      ).toBeNull();
    });
  });

  describe("error state", () => {
    it("sets aria-invalid when errorText is provided", () => {
      renderWithTheme(
        <InputField {...defaultProps} errorText="Username is required." />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("does not set aria-invalid when only helpText is provided", () => {
      renderWithTheme(
        <InputField {...defaultProps} helpText="Enter your username." />,
      );
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("prop forwarding", () => {
    it("disables the input when disabled is true", () => {
      renderWithTheme(<InputField {...defaultProps} disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("marks the input as required when required is true", () => {
      renderWithTheme(<InputField {...defaultProps} required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });

    it("makes the input read-only when readOnly is true", () => {
      renderWithTheme(<InputField {...defaultProps} readOnly />);
      expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    });

    it("forwards ref to the underlying HTMLInputElement", () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<InputField {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.id).toBe("username");
    });
  });

  describe("value coercion", () => {
    it("coerces a numeric value to a string on the input", () => {
      renderWithTheme(
        <InputField
          {...defaultProps}
          id="qty"
          label="Quantity"
          type="number"
          value={42}
          onChange={() => {}}
        />,
      );
      expect(screen.getByRole("spinbutton")).toHaveValue(42);
    });
  });
});
