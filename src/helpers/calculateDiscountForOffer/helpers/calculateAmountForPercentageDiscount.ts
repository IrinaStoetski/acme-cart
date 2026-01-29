import type { Offer } from "../../../types/Offer";
import type { Product } from "../../../types/Product";

export const calculateAmountForPercentageDiscount = (items: Product[], offer: Offer) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return Math.round(total * (offer.value / 100));
};
