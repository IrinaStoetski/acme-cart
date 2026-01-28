import type { Offer } from "../../types/Offer";
import type { Product } from "../../types/Product";
import type { OfferStrategy } from "./strategies";

export default class OfferProcessor {
  strategies: Record<string, OfferStrategy>;

  constructor(strategies: Record<string, OfferStrategy>) {
    this.strategies = strategies;
  }

  calculateDiscount(items: Product[], offer: Offer): number {
    const strategy = this.strategies[offer.type] || this.strategies.DEFAULT;

    return strategy(items, offer);
  }
}
