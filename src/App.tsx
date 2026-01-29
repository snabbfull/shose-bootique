import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { CartPage } from "./pages/CartPage";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { CatalogPage } from "./pages/CatalogPage";
import { AboutShop } from "./components/AboutShop/AboutShop";
import { Contacts } from "./components/Contacts/Contacts";
import './App.css'

export const App = () => {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<AboutShop />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* Можно добавить будущие страницы: /catalog, /about, /contacts */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};
