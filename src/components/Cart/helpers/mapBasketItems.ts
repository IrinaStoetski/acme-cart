import type { Product } from "../../../types/Product";

export const mapBasketItems = (items: Product[]) => {
  const itemsMap: { [key: string]: Product & { quantity: number } } = {};

  items.forEach((item) => {
    if (itemsMap[item.code]) {
      itemsMap[item.code].quantity += 1;
    } else {
      itemsMap[item.code] = { ...item, quantity: 1 };
    }
  });

  return itemsMap;
};
