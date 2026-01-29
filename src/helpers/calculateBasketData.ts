import type { DeliveryRule } from "../types/DeliveryRule";
import type { Offer } from "../types/Offer";
import type { Product } from "../types/Product";
import { calculateDiscountForOffer } from "./calculateDiscountForOffer";

type Params = {
  items: Product[];
  catalog: Product[];
  deliveryRules: DeliveryRule[];
  offers: Offer[];
};

export const calculateBasketData = ({ items, catalog, deliveryRules, offers }: Params) => {
  const subtotal = items.reduce((sum, product) => {
    const catalogProduct = catalog.find((p) => p.code === product.code);

    return sum + (catalogProduct?.price || 0);
  }, 0);

  const totalDiscount = offers.reduce((total, offer) => total + calculateDiscountForOffer(items, offer), 0);
  const discountedSubtotal = subtotal - totalDiscount;
  const sortedRules = [...deliveryRules].sort((a, b) => b.amountSpent - a.amountSpent);
  const deliveryFee =
    items.length === 0 ? 0 : sortedRules.find((rule) => discountedSubtotal >= rule.amountSpent)?.fee || 0;

  return {
    subtotal,
    discount: totalDiscount,
    deliveryFee,
    total: discountedSubtotal + deliveryFee,
  };
};
