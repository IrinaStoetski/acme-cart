import type { DeliveryRule } from "../../types/DeliveryRule";
import type { Offer } from "../../types/Offer";
import type { Product } from "../../types/Product";
import { calculateDiscountForOffer } from "../calculateDiscountForOffer";
import { calculateSubtotal, calculateDeliveryFee } from "./helpers";

type Params = {
  items: Product[];
  catalog: Product[];
  deliveryRules: DeliveryRule[];
  offers: Offer[];
};

export const calculateCartData = ({ items, catalog, deliveryRules, offers }: Params) => {
  const subtotal = calculateSubtotal(items, catalog);
  const totalDiscount = offers.reduce((total, offer) => total + calculateDiscountForOffer(items, offer), 0);
  const discountedSubtotal = subtotal - totalDiscount;
  const deliveryFee = calculateDeliveryFee({
    deliveryRules,
    itemsCount: items.length,
    discountedSubtotal,
  });
  const total = discountedSubtotal + deliveryFee;

  return {
    subtotal,
    discount: totalDiscount,
    deliveryFee,
    total,
  };
};
