import { Link, useNavigate } from "react-router-dom";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderCart } from "./HeaderCart";
import logo from "../../assets/img/header-logo.png";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Bosa Noga" />
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Главная
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/catalog">
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    О магазине
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contacts">
                    Контакты
                  </Link>
                </li>
              </ul>

              <div>
                <div className="header-controls-pics">
                  <HeaderSearch />
                  <HeaderCart onClick={() => navigate("/cart")} />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
