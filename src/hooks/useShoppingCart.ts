import { useMemo, useState } from "react";
import type { DeliveryRule } from "../types/DeliveryRule";
import type { Product } from "../types/Product";
import { calculateCartData } from "../helpers/calculateCartData";
import type { Offer } from "../types/Offer";

type Params = {
  catalog: Product[];
  offers: Offer[];
  deliveryRules: DeliveryRule[];
};

export function useShoppingCart({ catalog, offers, deliveryRules }: Params) {
  const [items, setItems] = useState<Product[]>([]);

  const add = (code: string) => {
    const product = catalog.find((p) => p.code === code);

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
      calculateCartData({
        items,
        catalog,
        deliveryRules,
        offers,
      }),
    [items, catalog, deliveryRules, offers]
  );

  return { items, total, add, remove, subtotal, discount, deliveryFee };
}
