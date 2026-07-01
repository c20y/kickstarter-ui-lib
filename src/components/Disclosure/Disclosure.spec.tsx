import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Theme } from "@twilio-paste/core/theme";
import { Disclosure } from "./Disclosure";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

const HEADING = "What is Twilio Flex?";
const CONTENT = "Twilio Flex is a programmable cloud contact center platform.";

describe("Disclosure", () => {
  describe("default state", () => {
    it("renders the heading text", () => {
      renderWithTheme(
        <Disclosure heading={HEADING} headingAs="h2">
          {CONTENT}
        </Disclosure>,
      );
      expect(screen.getByRole("button", { name: HEADING })).toBeInTheDocument();
    });

    it("is collapsed by default (aria-expanded='false')", () => {
      renderWithTheme(
        <Disclosure heading={HEADING} headingAs="h2">
          {CONTENT}
        </Disclosure>,
      );
      expect(screen.getByRole("button", { name: HEADING })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("is expanded when defaultVisible={true}", () => {
      renderWithTheme(
        <Disclosure heading={HEADING} headingAs="h2" defaultVisible>
          {CONTENT}
        </Disclosure>,
      );
      expect(screen.getByRole("button", { name: HEADING })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });
  });

  describe("interaction", () => {
    it("expands content on heading click", async () => {
      renderWithTheme(
        <Disclosure heading={HEADING} headingAs="h2">
          {CONTENT}
        </Disclosure>,
      );
      await userEvent.click(screen.getByRole("button", { name: HEADING }));
      expect(screen.getByRole("button", { name: HEADING })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("collapses content on second click", async () => {
      renderWithTheme(
        <Disclosure heading={HEADING} headingAs="h2">
          {CONTENT}
        </Disclosure>,
      );
      const btn = screen.getByRole("button", { name: HEADING });
      await userEvent.click(btn);
      await userEvent.click(btn);
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("props", () => {
    it("disables the heading button when disabled={true}", () => {
      renderWithTheme(
        <Disclosure heading={HEADING} headingAs="h2" disabled>
          {CONTENT}
        </Disclosure>,
      );
      expect(screen.getByRole("button", { name: HEADING })).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("renders the contained variant without error", () => {
      renderWithTheme(
        <Disclosure heading={HEADING} headingAs="h2" variant="contained">
          {CONTENT}
        </Disclosure>,
      );
      expect(screen.getByRole("button", { name: HEADING })).toBeInTheDocument();
    });

    it("renders the heading at the level passed via headingAs", () => {
      renderWithTheme(
        <Disclosure heading={HEADING} headingAs="h3">
          {CONTENT}
        </Disclosure>,
      );
      expect(
        screen.getByRole("heading", { level: 3, name: HEADING }),
      ).toBeInTheDocument();
    });

    it("renders a different heading level without leaking the old default", () => {
      renderWithTheme(
        <Disclosure heading={HEADING} headingAs="h4">
          {CONTENT}
        </Disclosure>,
      );
      expect(
        screen.queryByRole("heading", { level: 2, name: HEADING }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 4, name: HEADING }),
      ).toBeInTheDocument();
    });
  });
});
