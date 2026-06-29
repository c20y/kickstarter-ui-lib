import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { SelectField } from "./SelectField";
import type { SelectOption, SelectOptionGroup } from "./SelectField";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const FLAT_OPTIONS: SelectOption[] = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "product", label: "Product" },
];

const defaultProps = {
  id: "department",
  label: "Department",
  options: FLAT_OPTIONS,
};

describe("SelectField", () => {
  describe("renders correctly", () => {
    it("renders a select with the correct id", () => {
      renderWithTheme(<SelectField {...defaultProps} />);
      expect(screen.getByRole("combobox")).toHaveAttribute("id", "department");
    });

    it("renders the label and associates it with the select", () => {
      renderWithTheme(<SelectField {...defaultProps} />);
      expect(screen.getByText("Department")).toBeInTheDocument();
      expect(screen.getByLabelText("Department")).toBeInTheDocument();
    });

    it("renders flat options as option elements", () => {
      renderWithTheme(<SelectField {...defaultProps} />);
      expect(screen.getByRole("option", { name: "Design" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Engineering" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Product" })).toBeInTheDocument();
    });

    it("renders grouped options under an optgroup", () => {
      const groupedOptions: Array<SelectOption | SelectOptionGroup> = [
        {
          label: "Americas",
          options: [
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
          ],
        },
        {
          label: "Europe",
          options: [{ value: "uk", label: "United Kingdom" }],
        },
      ];
      renderWithTheme(
        <SelectField {...defaultProps} options={groupedOptions} />,
      );
      expect(screen.getByRole("option", { name: "United States" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Canada" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "United Kingdom" })).toBeInTheDocument();
    });
  });

  describe("help / error text", () => {
    it("renders helpText and sets aria-describedby", () => {
      renderWithTheme(
        <SelectField {...defaultProps} helpText="Select your department." />,
      );
      expect(screen.getByText("Select your department.")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-describedby",
        "department-help",
      );
    });

    it("renders errorText and sets aria-describedby", () => {
      renderWithTheme(
        <SelectField {...defaultProps} errorText="Please select a department." />,
      );
      expect(screen.getByText("Please select a department.")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-describedby",
        "department-help",
      );
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <SelectField
          {...defaultProps}
          helpText="Select your department."
          errorText="Please select a department."
        />,
      );
      expect(screen.getByText("Please select a department.")).toBeInTheDocument();
      expect(screen.queryByText("Select your department.")).not.toBeInTheDocument();
    });

    it("does not set aria-describedby when neither helpText nor errorText given", () => {
      renderWithTheme(<SelectField {...defaultProps} />);
      expect(
        screen.getByRole("combobox").getAttribute("aria-describedby"),
      ).toBeNull();
    });
  });

  describe("prop forwarding", () => {
    it("disables the select when disabled is true", () => {
      renderWithTheme(<SelectField {...defaultProps} disabled />);
      expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("marks the select as required when required is true", () => {
      renderWithTheme(<SelectField {...defaultProps} required />);
      expect(screen.getByRole("combobox")).toBeRequired();
    });

    it("forwards ref to the underlying HTMLSelectElement", () => {
      const ref = React.createRef<HTMLSelectElement>();
      renderWithTheme(<SelectField {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
      expect(ref.current?.id).toBe("department");
    });
  });

  describe("options behaviour", () => {
    it("renders a disabled option as disabled in the DOM", () => {
      const options: SelectOption[] = [
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing", disabled: true },
      ];
      renderWithTheme(<SelectField {...defaultProps} options={options} />);
      expect(screen.getByRole("option", { name: "Marketing" })).toBeDisabled();
      expect(screen.getByRole("option", { name: "Design" })).not.toBeDisabled();
    });
  });
});
