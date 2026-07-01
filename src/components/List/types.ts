import type { UnorderedListProps } from "@twilio-paste/core/list";

export interface ListEntry {
  /** The text content of the list item. This can be a string or any React node, allowing for flexibility in the content displayed within each list item.
   * @type {React.ReactNode}
   */
  text: React.ReactNode;
  /** An optional sublist that can be nested within the current list item. This allows for hierarchical list structures, where each list item can contain its own list of items.
   * @type {ListProps}
   */
  subList?: ListProps;
}

export interface ListProps extends Omit<
  UnorderedListProps,
  "children" | "element" | "type"
> {
  /** The type of list to be rendered. This can be either an ordered list ("ol") or an unordered list ("ul"), allowing for different visual representations of the list items.
   * @type {"ol" | "ul"}
   */
  type: "ol" | "ul";
  /** An array of objects representing the items to be displayed in the list. Each object should have a `text` property (the content of the list item) and an optional `subList` property (a nested list of items).
   * @type {ListEntry[]}
   */
  items: ListEntry[];
}
