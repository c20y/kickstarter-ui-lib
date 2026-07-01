import type { Meta, StoryObj } from "@storybook/react";
import { DescriptionList } from "./DescriptionList";

const meta: Meta<typeof DescriptionList> = {
  title: "Components/DescriptionList",
  component: DescriptionList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DescriptionList>;

export const Default: Story = {
  args: {
    items: [
      { term: "Status", details: "Active" },
      { term: "Region", details: "us1" },
      { term: "Account SID", details: "AC00000000000000000000000000000000" },
    ],
  },
};

export const MultipleTerms: Story = {
  name: "Multiple terms, one detail",
  args: {
    items: [
      { term: ["Phone Number", "Email"], details: "twilion@twilio.com" },
    ],
  },
};

export const MultipleDetails: Story = {
  name: "One term, multiple details",
  args: {
    items: [{ term: "Languages", details: ["English", "Spanish", "French"] }],
  },
};

export const EmptyState: Story = {
  name: "Missing detail (empty state)",
  args: {
    items: [{
      "term": "Phone Number"
    }, {
      "term": "Email",
      "details": "twilion@twilio.com"
    }],
  },
};

export const MixedSets: Story = {
  args: {
    items: [
      { term: "Status", details: "Active" },
      { term: ["Phone Number", "Email"], details: "twilion@twilio.com" },
      { term: "Languages", details: ["English", "Spanish"] },
      { term: "Fax" },
    ],
  },
};

export const RichContent: Story = {
  name: "ReactNode term/details",
  args: {
    items: [
      { term: "Status", details: <strong>Active</strong> },
      {
        term: "Docs",
        details: <a href="https://paste.twilio.design">paste.twilio.design</a>,
      },
    ],
  },
};
