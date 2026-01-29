import { Banner } from "./Banner";

export function NotFoundPage() {
  return (
    <section className="top-sales">
      <Banner/>
      <h2 className="text-center">Страница не найдена</h2>
      <p>
        Извините, такая страница не найдена!
      </p>
    </section>
  );
}