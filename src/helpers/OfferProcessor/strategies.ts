import type { Offer } from "../../types/Offer";
import type { Product } from "../../types/Product";

export type OfferStrategy = (items: Product[], offer: Offer) => number;

export const OfferStrategies: Record<string, OfferStrategy> = {
  PERCENTAGE: (items, offer) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return total * (offer.value / 100);
  },

  /**
   * Calculates the total discount for a "Buy One Get One" (BOGO) offer.
   * @param {Product[]} items - The complete list of products currently in the basket.
   * @param {Object} offer - The offer configuration.
   * @param {string} offer.productCode - The unique identifier of the product eligible for BOGO.
   * @param {number} [offer.value=1] - The discount multiplier for the second item (e.g., 1 for "Free", 0.5 for "Half-Price").
   * @returns {number} The total currency amount to be discounted from the subtotal.
   */
  BOGO: (items: Product[], offer: Offer): number => {
    const eligible = items.filter((item) => item.code === offer.productCode);
    if (eligible.length < 2) return 0;

    const unitPrice = eligible[0].price;
    const count = eligible.length;
    const freeItemsCount = Math.floor(count / 2);

    return freeItemsCount * (unitPrice * (offer.value || 1));
  },

  DEFAULT: () => 0,
};
