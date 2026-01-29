import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  categoriesRequested,
  categorySelected,
  catalogItemsRequested,
} from "../store/actions";

type Category = string | { id: number; title: string };

export const CatalogCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategory } = useSelector(
    (state: RootState) => state.products.catalog.data,
  );

  useEffect(() => {
    dispatch(categoriesRequested());
  }, [dispatch]);

  const onSelect = (categoryTitle: string, categoryId?: number) => {
    dispatch(categorySelected(categoryTitle));
    dispatch(
      catalogItemsRequested({
        categoryId: categoryTitle === "Все" ? undefined : categoryId,
      }),
    );
  };

  if (!categories || categories.length === 0) return null;

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categories.map((category: Category) => {
        if (typeof category === "string") {
          return (
            <li className="nav-item" key={category}>
              <button
                className={
                  "nav-link" + (selectedCategory === category ? " active" : "")
                }
                onClick={() => onSelect(category)}
              >
                {category}
              </button>
            </li>
          );
        } else {
          return (
            <li className="nav-item" key={category.id}>
              <button
                className={
                  "nav-link" +
                  (category.title === selectedCategory ? " active" : "")
                }
                onClick={() => onSelect(category.title, category.id)}
              >
                {category.title}
              </button>
            </li>
          );
        }
      })}
    </ul>
  );
};
