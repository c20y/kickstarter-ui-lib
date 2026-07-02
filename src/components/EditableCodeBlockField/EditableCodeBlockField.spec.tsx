import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { EditableCodeBlockField } from "./EditableCodeBlockField";

// Paste's EditableCodeBlock bundles Monaco, which loads via a real `<script>`
// tag pointed at a CDN — happy-dom refuses to fetch it, leaving an unhandled
// rejection per test. These specs only assert on the loading state, so stub
// the whole module rather than rendering the real (network-dependent) editor.
vi.mock("@twilio-paste/core/editable-code-block", () => ({
  EditableCodeBlockWrapper: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
  EditableCodeBlockHeader: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
  EditableCodeBlock: ({
    i18nLoadingLabel = "Loading code...",
  }: {
    i18nLoadingLabel?: string;
  }) => <div>{i18nLoadingLabel}</div>,
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const defaultProps = {
  label: "Script",
  defaultLanguage: "typescript",
};

describe("EditableCodeBlockField", () => {
  describe("renders correctly", () => {
    it("renders the label heading text", () => {
      renderWithTheme(<EditableCodeBlockField {...defaultProps} />);
      expect(screen.getByText("Script")).toBeInTheDocument();
    });

    it("renders the editor loading state without crash", () => {
      renderWithTheme(<EditableCodeBlockField {...defaultProps} />);
      expect(screen.getByText("Loading code...")).toBeInTheDocument();
    });

    it("accepts a custom i18nLoadingLabel", () => {
      renderWithTheme(
        <EditableCodeBlockField {...defaultProps} i18nLoadingLabel="Loading editor…" />,
      );
      expect(screen.getByText("Loading editor…")).toBeInTheDocument();
    });
  });

  describe("help / error text", () => {
    it("renders helpText in the DOM", () => {
      renderWithTheme(
        <EditableCodeBlockField {...defaultProps} helpText="Write valid TypeScript." />,
      );
      expect(screen.getByText("Write valid TypeScript.")).toBeInTheDocument();
    });

    it("renders errorText in the DOM", () => {
      renderWithTheme(
        <EditableCodeBlockField {...defaultProps} errorText="Syntax error on line 3." />,
      );
      expect(screen.getByText("Syntax error on line 3.")).toBeInTheDocument();
    });

    it("shows errorText and hides helpText when both are provided", () => {
      renderWithTheme(
        <EditableCodeBlockField
          {...defaultProps}
          helpText="Write valid TypeScript."
          errorText="Syntax error on line 3."
        />,
      );
      expect(screen.getByText("Syntax error on line 3.")).toBeInTheDocument();
      expect(screen.queryByText("Write valid TypeScript.")).not.toBeInTheDocument();
    });
  });
});
