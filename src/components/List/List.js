import ListItem from "../ListItem/ListItem";
import "./List.scss";

const List = () => {
  // TODO: change this temp list
  const allItems = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Bread" },
    { id: 3, name: "Milk" },
  ];
  const list = allItems.map((item) => {
    return <ListItem key={item.id} id={`item${item.id}`} name={item.name} />;
  });

  return <div>{list}</div>;
};

export default List;
