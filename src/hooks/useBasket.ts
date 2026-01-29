import { useMemo, useState } from "react";
import type { DeliveryRule } from "../types/DeliveryRule";
import type { Product } from "../types/Product";
import { calculateBasketData } from "../helpers/calculateBasketData";
import type { Offer } from "../types/Offer";

export function useBasket(catalogue: Product[], offers: Offer[], deliveryRules: DeliveryRule[]) {
  const [items, setItems] = useState<Product[]>([]);

  const add = (code: string) => {
    const product = catalogue.find((p) => p.code === code);

    if (product) {
      setItems((prev) => [...prev, product]);
    }
  };

  const remove = (code: string) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.code === code);

      return idx > -1 ? prev.filter((_, i) => i !== idx) : prev;
    });
  };

  const { total, deliveryFee, subtotal, discount } = useMemo(
    () =>
      calculateBasketData({
        items,
        catalogue,
        deliveryRules,
        offers,
      }),
    [items, catalogue, deliveryRules, offers]
  );

  return { items, total, add, remove, subtotal, discount, deliveryFee };
}
