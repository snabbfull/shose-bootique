import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topSalesRequested } from "../store/actions";
import type { RootState, AppDispatch } from "../store/index";
import { Preloader } from "./Preloader";
import { CatalogItem } from "./catalog/CatalogItem";

export const TopSales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.products.topSales,
  );

  useEffect(() => {
    dispatch(topSalesRequested());
  }, [dispatch]);

  const items = data?.data ?? [];

  if (loading) {
    return (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <Preloader />
      </section>
    );
  }

  if (error || items.length === 0) return null;

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {items.map((item) => (
          <div className="col-4" key={item.id}>
            <CatalogItem item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};
