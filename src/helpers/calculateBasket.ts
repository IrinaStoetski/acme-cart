import type { DeliveryRule } from "../types/DeliveryRule";
import type { Offer } from "../types/Offer";
import type { Product } from "../types/Product";
import OfferProcessor from "./OfferProcessor";

type Params = {
  items: Product[];
  catalogue: Product[];
  deliveryRules: DeliveryRule[];
  offerProcessor: OfferProcessor;
  offers: Offer[];
};

export const calculateBasketTotal = ({ items, catalogue, deliveryRules, offerProcessor, offers }: Params) => {
  const subtotal = items.reduce((sum, product) => {
    const catalogProduct = catalogue.find((p) => p.code === product.code);

    return sum + (catalogProduct?.price || 0);
  }, 0);

  const discount = offers.reduce((total, offer) => total + offerProcessor.calculateDiscount(items, offer), 0);
  const total = subtotal - discount;

  const deliveryFee =
    items.length === 0
      ? 0
      : deliveryRules.sort((a, b) => b.amountSpent - a.amountSpent).find((rule) => total >= rule.amountSpent)?.fee || 0;

  return Math.floor((total + deliveryFee) * 100) / 100;
};
