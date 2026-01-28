import { useMemo, useState } from "react";
import type { DeliveryRule } from "../types/DeliveryRule";
import type { Product } from "../types/Product";
import { calculateBasketTotal } from "../helpers/calculateBasket";
import type { Offer } from "../types/Offer";
import OfferProcessor, { OfferStrategies } from "../helpers/OfferProcessor";

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

  const total = useMemo(
    () =>
      calculateBasketTotal({
        items,
        catalogue,
        deliveryRules,
        offers,
        offerProcessor: new OfferProcessor(OfferStrategies),
      }),
    [items, catalogue, deliveryRules, offers]
  );

  return { items, total, add, remove };
}
