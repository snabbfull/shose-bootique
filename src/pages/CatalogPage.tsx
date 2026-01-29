import { Catalog } from "../components/Catalog";
import { Banner } from "../components/Banner";

export const CatalogPage = () => {
  return (
    <div className="row">
      <div className="col">
        <Banner />
        <Catalog />
      </div>
    </div>
  );
};
