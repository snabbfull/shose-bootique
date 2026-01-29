import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { CatalogItem } from "./CatalogItem";

export const CatalogList = () => {
  const items = useSelector(
    (state: RootState) => state.products.catalog.data?.items ?? [],
  );

  return (
    <div className="row">
      {items.map((item) => (
        <div className="col-4" key={item.id}>
          <CatalogItem item={item} />
        </div>
      ))}
    </div>
  );
};
