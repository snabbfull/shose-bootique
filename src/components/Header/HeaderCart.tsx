import { useSelector } from "react-redux";
import type { RootState } from "../../store/index";

interface Props {
  onClick: () => void;
}

export const HeaderCart = ({ onClick }: Props) => {
  const items = useSelector((state: RootState) => state.cart.items);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div
      className="header-controls-pic header-controls-cart"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {totalCount > 0 && (
        <div className="header-controls-cart-full">{totalCount}</div>
      )}
      <div className="header-controls-cart-menu" />
    </div>
  );
};
