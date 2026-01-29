import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { catalogItemsRequested } from "../../store/actions";
import type { AppDispatch } from "../../store/index";

export const HeaderSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    dispatch(
      catalogItemsRequested({
        search,
      }),
    );

    navigate("/catalog");
    setIsOpen(false);
  };

  return (
    <>
      <div
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
        onClick={() => setIsOpen((v) => !v)}
      />

      <form
        data-id="search-form"
        className={`header-controls-search-form form-inline ${
          isOpen ? "" : "invisible"
        }`}
        onSubmit={submitHandler}
      >
        <input
          className="form-control"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </>
  );
};
