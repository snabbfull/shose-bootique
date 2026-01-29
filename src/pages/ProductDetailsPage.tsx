import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../store";
import { productDetailsRequested, addItem } from "../store/actions";
import { Preloader } from "../components/Preloader";

export const ProductDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.products.details,
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(productDetailsRequested(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return <Preloader />;
  if (error) return <div className="text-center">{error}</div>;
  if (!data.item) return null;

  const { item } = data;

  // В API поле может называться "avalible", поэтому учитываем оба варианта
  const availableSizes =
    item.sizes?.filter((s) => s.available ?? s.avalible) ?? [];

  const handleAddToCart = () => {
    if (!selectedSize) return;

    dispatch(
      addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        count,
        size: selectedSize,
      }),
    );

    navigate("/cart");
  };

  return (
    <section className="catalog-item">
      <h2 className="text-center">{item.title}</h2>

      <div className="row">
        <div className="col-5">
          <img src={item.images[0]} className="img-fluid" alt={item.title} />
        </div>

        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{item.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{item.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{item.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{item.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{item.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{item.reason}</td>
              </tr>
            </tbody>
          </table>

          {availableSizes.length > 0 && (
            <>
              <div className="text-center">
                <p>
                  Размеры в наличии:&nbsp;
                  {availableSizes.map((size) => (
                    <span
                      key={size.size}
                      className={
                        size.size === selectedSize
                          ? "catalog-item-size selected"
                          : "catalog-item-size"
                      }
                      onClick={() => setSelectedSize(size.size)}
                    >
                      {size.size}
                    </span>
                  ))}
                </p>

                <p>
                  Количество:&nbsp;
                  <span className="btn-group btn-group-sm pl-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCount((c) => Math.max(1, c - 1))}
                    >
                      -
                    </button>
                    <span className="btn btn-outline-primary">{count}</span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCount((c) => Math.min(10, c + 1))}
                    >
                      +
                    </button>
                  </span>
                </p>
              </div>

              <button
                className="btn btn-danger btn-block btn-lg"
                disabled={!selectedSize}
                onClick={handleAddToCart}
              >
                В корзину
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
