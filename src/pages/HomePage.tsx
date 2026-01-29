import { Banner } from "../components/Banner";
import { TopSales } from "../components/TopSales";
import { Catalog } from "../components/Catalog";

export const HomePage = () => {
  return (
    <div className="row">
      <div className="col">
        <Banner />
        <TopSales />
        <Catalog />
      </div>
    </div>
  );
};
