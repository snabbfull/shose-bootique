import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { catalogItemsRequested, catalogLoadMore } from "../store/actions";
import { Preloader } from "./Preloader";
import { CatalogCategories } from "./CatalogCategories";
import { CatalogList } from "./catalog/CatalogList";

export const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data = {
      items: [],
      categories: [],
      hasMore: false,
      selectedCategory: null,
      search: "",
      offset: 0,
    },
    loading,
    loadingMore,
    error,
  } = useSelector((state: RootState) => state.products.catalog);

  // Локальное состояние поиска инициализируем сразу из data.search
  const [searchText, setSearchText] = useState<string>(data.search || "");

  // Загрузка товаров при монтировании
  useEffect(() => {
    dispatch(catalogItemsRequested({}));
  }, [dispatch]);

  // Вычисляем id выбранной категории
  const selectedCategoryId = useMemo(() => {
    if (!data.selectedCategory || data.selectedCategory === "Все")
      return undefined;

    const categories = data.categories as Array<
      { id: number; title: string } | string
    >;
    const found = categories.find(
      (c) => typeof c !== "string" && c.title === data.selectedCategory,
    ) as { id: number; title: string } | undefined;

    return found?.id;
  }, [data.categories, data.selectedCategory]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      catalogItemsRequested({
        search: searchText.trim() || undefined,
        categoryId: selectedCategoryId,
      }),
    );
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      <form
        className="catalog-search-form form-inline mb-3"
        onSubmit={onSearchSubmit}
      >
        <input
          className="form-control"
          placeholder="Поиск"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>

      <CatalogCategories />

      {loading && data.items.length === 0 && <Preloader />}

      {error && data.items.length === 0 && (
        <div className="text-center">{error}</div>
      )}

      <CatalogList />

      {data.hasMore && !loading && (
        <div className="text-center mt-3">
          {loadingMore && <Preloader />}
          <button
            className="btn btn-outline-primary"
            disabled={loadingMore}
            onClick={() =>
              dispatch(
                catalogLoadMore({
                  categoryId: selectedCategoryId,
                  search: data.search || "",
                  offset: data.offset,
                }),
              )
            }
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  );
};
