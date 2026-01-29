// src/api/productsApi.ts
import type { Item } from "../store/actions";

const BASE_URL = "http://localhost:7070/api";

/** Получить хиты продаж */
export const fetchTopSales = async (): Promise<Item[]> => {
  const response = await fetch(`${BASE_URL}/top-sales`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке хитов продаж: ${response.statusText}`);
  }
  const data: Item[] = await response.json();
  return data; // пустой массив — тоже ок
};

/** Получить категории каталога */
export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке категорий: ${response.statusText}`);
  }
  const categories: string[] = await response.json();
  return ["Все", ...categories]; // добавляем "Все" в начало
};

/** Получить элементы каталога с фильтром, смещением и лимитом */
export const fetchCatalogItems = async ({
  categoryId,
  search,
  offset = 0,
  limit = 6,
}: {
  categoryId?: number | string;
  search?: string;
  offset?: number;
  limit?: number;
} = {}): Promise<Item[]> => {
  const params = new URLSearchParams();

  if (categoryId && categoryId !== "Все")
    params.append("categoryId", categoryId.toString());
  if (search) params.append("q", search);
  if (offset) params.append("offset", offset.toString());
  if (limit) params.append("limit", limit.toString());

  const url = `${BASE_URL}/items?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке каталога: ${response.statusText}`);
  }
  const items: Item[] = await response.json();
  return items;
};

/** Получить детали одного товара */
export const fetchProductDetails = async (
  id: number | string,
): Promise<Item> => {
  const response = await fetch(`${BASE_URL}/items/${id}`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке товара: ${response.statusText}`);
  }
  const item: Item = await response.json();
  return item;
};

