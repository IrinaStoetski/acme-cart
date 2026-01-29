import type { Offer } from "../../types/Offer";
import type { Product } from "../../types/Product";

export type OfferStrategy = (items: Product[], offer: Offer) => number;
