import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { removeItem, updateItem } from "../store/actions";
import { Banner } from "../components/Banner";
import { OrderPage } from "./OrderPage";

export const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.count, 0);

  if (items.length === 0) {
    return (
      <>
      <Banner />
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <p className="text-center">Корзина пуста</p>
      </section>
    </>
    );
  }

  const handleIncrement = (id: number, size: string) => {
    const item = items.find((i) => i.id === id && i.size === size);
    if (!item) return;
    dispatch(updateItem({ id, size, count: Math.min(item.count + 1, 10) }));
  };

  const handleDecrement = (id: number, size: string) => {
    const item = items.find((i) => i.id === id && i.size === size);
    if (!item) return;
    dispatch(updateItem({ id, size, count: Math.max(item.count - 1, 1) }));
  };

  const handleRemove = (id: number, size: string) => {
    dispatch(removeItem({ id, size }));
  };

  return (
    <>
      <Banner />
    <section className="cart">
      <h2 className="text-center">Корзина</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Размер</th>
            <th>Кол-во</th>
            <th>Цена</th>
            <th>Итого</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={`${item.id}-${item.size}`}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.size}</td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDecrement(item.id, item.size)}
                  >
                    -
                  </button>
                  <span className="btn btn-outline-primary">{item.count}</span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleIncrement(item.id, item.size)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>{item.price.toLocaleString()} ₽</td>
              <td>{(item.price * item.count).toLocaleString()} ₽</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemove(item.id, item.size)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={5} className="text-right">
              Общая стоимость
            </td>
            <td>{total.toLocaleString()} ₽</td>
            <td />
          </tr>
        </tbody>
      </table>
    </section>
    <OrderPage />
    </>
  );
};
