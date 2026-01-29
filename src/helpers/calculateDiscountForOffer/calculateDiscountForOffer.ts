import type { Offer } from "../../types/Offer";
import type { Product } from "../../types/Product";
import { calculateAmountForBogoDiscount, calculateAmountForPercentageDiscount } from "./helpers";
import type { OfferStrategy } from "./types";

const OFFER_STRATEGIES: Record<string, OfferStrategy> = {
  PERCENTAGE: calculateAmountForPercentageDiscount,
  BOGO: calculateAmountForBogoDiscount,
  DEFAULT: () => 0,
};

export const calculateDiscountForOffer = (items: Product[], offer: Offer): number => {
  const strategy = OFFER_STRATEGIES[offer.type] || OFFER_STRATEGIES.DEFAULT;

  return strategy(items, offer);
};
