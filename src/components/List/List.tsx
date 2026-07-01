import { OrderedList, UnorderedList, ListItem } from "@twilio-paste/core/list";
import type { ListProps } from "./types";

export const List = ({ type, items, ...rest }: ListProps) => {
  const listItems = items.map((item, i) => (
    <ListItem key={i}>
      {item.text}
      {item.subList && <List {...item.subList} />}
    </ListItem>
  ));

  return type === "ol" ? (
    <OrderedList {...rest}>{listItems}</OrderedList>
  ) : (
    <UnorderedList {...rest}>{listItems}</UnorderedList>
  );
};

List.displayName = "List";
