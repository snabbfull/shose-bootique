import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/index";
import { orderRequested } from "../store/actions";

export const OrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [agreement, setAgreement] = useState(false);

  // Получаем состояние заказа из стора (если добавим order slice)
  // Пока используем локальное состояние для loading и error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !address || !agreement) return;

    if (cartItems.length === 0) {
      setError("Корзина пуста");
      return;
    }

    setLoading(true);
    setError(null);

    // Диспатчим экшен, saga сделает запрос
    dispatch(
      orderRequested({
        owner: { phone, address },
        items: cartItems.map((item) => ({
          id: item.id,
          price: item.price,
          count: item.count,
        })),
      }),
    );

    // После успешной отправки корзина очистится через orderSucceeded в cartSlice
    // Редирект можно сделать через отдельный эффект или страницу успеха
  };

  if (cartItems.length === 0) {
    return (
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <p className="text-center">Корзина пуста</p>
      </section>
    );
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>

      {error && <div className="text-danger text-center mb-3">{error}</div>}

      <div className="order-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              id="phone"
              type="tel"
              className="form-control"
              placeholder="Ваш телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              id="address"
              type="text"
              className="form-control"
              placeholder="Адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-check">
            <input
              id="agreement"
              className="form-check-input"
              type="checkbox"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-danger btn-block"
            disabled={loading || !agreement}
          >
            {loading ? "Отправка..." : "Оформить"}
          </button>
        </form>
      </div>
    </section>
  );
};
