import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { RadioField } from "./RadioField";
import type { RadioOption } from "./RadioField";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const OPTIONS: RadioOption[] = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const defaultProps = {
  name: "role",
  label: "Role",
  options: OPTIONS,
};

describe("RadioField", () => {
  describe("renders correctly", () => {
    it("renders a fieldset group with the legend name", () => {
      renderWithTheme(<RadioField {...defaultProps} />);
      expect(screen.getByRole("group", { name: "Role" })).toBeInTheDocument();
    });

    it("renders the legend text", () => {
      renderWithTheme(<RadioField {...defaultProps} />);
      expect(screen.getByText("Role")).toBeInTheDocument();
    });

    it("renders all options as radio inputs", () => {
      renderWithTheme(<RadioField {...defaultProps} />);
      expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("each radio has the correct accessible name", () => {
      renderWithTheme(<RadioField {...defaultProps} />);
      expect(screen.getByRole("radio", { name: "Admin" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Editor" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Viewer" })).toBeInTheDocument();
    });
  });

  describe("id generation", () => {
    it("gives each radio an id of ${name}-${value}", () => {
      renderWithTheme(<RadioField {...defaultProps} />);
      expect(screen.getByRole("radio", { name: "Admin" })).toHaveAttribute("id", "role-admin");
      expect(screen.getByRole("radio", { name: "Editor" })).toHaveAttribute("id", "role-editor");
      expect(screen.getByRole("radio", { name: "Viewer" })).toHaveAttribute("id", "role-viewer");
    });
  });

  describe("help / error text", () => {
    it("renders helpText content in the DOM", () => {
      renderWithTheme(
        <RadioField {...defaultProps} helpText="Select your access level." />,
      );
      expect(screen.getByText("Select your access level.")).toBeInTheDocument();
    });

    it("renders errorText content in the DOM", () => {
      renderWithTheme(
        <RadioField {...defaultProps} errorText="Please select a role." />,
      );
      expect(screen.getByText("Please select a role.")).toBeInTheDocument();
    });
  });

  describe("prop forwarding", () => {
    it("disables all radios when disabled is true", () => {
      renderWithTheme(<RadioField {...defaultProps} disabled />);
      screen.getAllByRole("radio").forEach((radio) => {
        expect(radio).toBeDisabled();
      });
    });

    it("disables only the specified option when disabled is set per-option", () => {
      const options: RadioOption[] = [
        { value: "admin", label: "Admin" },
        { value: "editor", label: "Editor", disabled: true },
        { value: "viewer", label: "Viewer" },
      ];
      renderWithTheme(<RadioField {...defaultProps} options={options} />);
      expect(screen.getByRole("radio", { name: "Editor" })).toBeDisabled();
      expect(screen.getByRole("radio", { name: "Admin" })).not.toBeDisabled();
      expect(screen.getByRole("radio", { name: "Viewer" })).not.toBeDisabled();
    });

    it("checks the radio matching the controlled value", () => {
      renderWithTheme(
        <RadioField {...defaultProps} value="editor" onChange={() => {}} />,
      );
      expect(screen.getByRole("radio", { name: "Editor" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Admin" })).not.toBeChecked();
      expect(screen.getByRole("radio", { name: "Viewer" })).not.toBeChecked();
    });
  });
});
