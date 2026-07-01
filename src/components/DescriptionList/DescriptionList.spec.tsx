import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@twilio-paste/core/theme";
import { DescriptionList } from "./DescriptionList";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<Theme.Provider theme="default">{ui}</Theme.Provider>);

describe("DescriptionList", () => {
  describe("renders correctly", () => {
    it("renders a term and its details", () => {
      renderWithTheme(
        <DescriptionList items={[{ term: "Status", details: "Active" }]} />,
      );
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("renders multiple sets in order", () => {
      renderWithTheme(
        <DescriptionList
          items={[
            { term: "Status", details: "Active" },
            { term: "Region", details: "us1" },
          ]}
        />,
      );
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Region")).toBeInTheDocument();
      expect(screen.getByText("us1")).toBeInTheDocument();
    });

    it("renders the semantic dl/dt/dd elements", () => {
      const { container } = renderWithTheme(
        <DescriptionList items={[{ term: "Status", details: "Active" }]} />,
      );
      expect(container.querySelector("dl")).toBeInTheDocument();
      expect(container.querySelector("dt")).toBeInTheDocument();
      expect(container.querySelector("dd")).toBeInTheDocument();
    });

    it("renders no sets when items is empty", () => {
      const { container } = renderWithTheme(<DescriptionList items={[]} />);
      expect(container.querySelectorAll("dt")).toHaveLength(0);
      expect(container.querySelectorAll("dd")).toHaveLength(0);
    });
  });

  describe("multiple terms and details", () => {
    it("renders multiple terms sharing one detail", () => {
      const { container } = renderWithTheme(
        <DescriptionList
          items={[
            {
              term: ["Phone Number", "Email"],
              details: "twilion@twilio.com",
            },
          ]}
        />,
      );
      expect(screen.getByText("Phone Number")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(container.querySelectorAll("dt")).toHaveLength(2);
      expect(container.querySelectorAll("dd")).toHaveLength(1);
    });

    it("renders multiple details for one term", () => {
      const { container } = renderWithTheme(
        <DescriptionList
          items={[{ term: "Languages", details: ["English", "Spanish"] }]}
        />,
      );
      expect(screen.getByText("English")).toBeInTheDocument();
      expect(screen.getByText("Spanish")).toBeInTheDocument();
      expect(container.querySelectorAll("dt")).toHaveLength(1);
      expect(container.querySelectorAll("dd")).toHaveLength(2);
    });
  });

  describe("empty details state", () => {
    it("renders an empty details tag when details is omitted", () => {
      const { container } = renderWithTheme(
        <DescriptionList items={[{ term: "Fax" }]} />,
      );
      expect(screen.getByText("Fax")).toBeInTheDocument();
      expect(container.querySelectorAll("dd")).toHaveLength(1);
      expect(container.querySelector("dd")).toBeEmptyDOMElement();
    });

    it("renders an empty details tag when details is an empty array", () => {
      const { container } = renderWithTheme(
        <DescriptionList items={[{ term: "Fax", details: [] }]} />,
      );
      expect(container.querySelectorAll("dd")).toHaveLength(1);
      expect(container.querySelector("dd")).toBeEmptyDOMElement();
    });

    it("keeps term/details pairing correct across sets with mixed empty state", () => {
      const { container } = renderWithTheme(
        <DescriptionList
          items={[
            { term: "Phone Number" },
            { term: "Email", details: "twilion@twilio.com" },
          ]}
        />,
      );
      const dds = container.querySelectorAll("dd");
      expect(dds).toHaveLength(2);
      expect(dds[0]).toBeEmptyDOMElement();
      expect(dds[1]).toHaveTextContent("twilion@twilio.com");
    });
  });

  describe("ReactNode content", () => {
    it("renders a ReactNode term and a ReactNode detail", () => {
      renderWithTheme(
        <DescriptionList
          items={[
            {
              term: (
                <span>
                  <strong>Status</strong>
                </span>
              ),
              details: <a href="https://example.com">Active</a>,
            },
          ]}
        />,
      );
      expect(screen.getByText("Status").tagName).toBe("STRONG");
      expect(screen.getByRole("link", { name: "Active" })).toHaveAttribute(
        "href",
        "https://example.com",
      );
    });
  });

  describe("prop forwarding", () => {
    it("forwards native dl attributes", () => {
      const { container } = renderWithTheme(
        <DescriptionList
          items={[{ term: "Status", details: "Active" }]}
          aria-label="Account details"
        />,
      );
      expect(container.querySelector("dl")).toHaveAttribute(
        "aria-label",
        "Account details",
      );
    });
  });
});
