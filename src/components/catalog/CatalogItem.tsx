import { Link } from "react-router-dom";
import type { Item } from "../../store/actions";

interface Props {
  item: Item;
}

export const CatalogItem = ({ item }: Props) => {
  return (
    <div className="card catalog-item-card h-100">
      <img
        src={item.images[0]}
        className="card-img-top img-fluid"
        alt={item.title}
      />
      <div className="card-body">
        <p className="card-text">{item.title}</p>
        <p className="card-text">{item.price} руб.</p>

        <Link to={`/products/${item.id}`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </div>
  );
};
