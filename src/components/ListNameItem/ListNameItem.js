import "./ListNameItem.scss";

const ListNameItem = ({ list }) => {
  return (
    <a href={`/lists/${list.id}`}>
      <h2>{list.name}</h2>
    </a>
  );
};

export default ListNameItem;
