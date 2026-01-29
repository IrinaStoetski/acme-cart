import type { Product } from "./types/Product";
import type { DeliveryRule } from "./types/DeliveryRule";
import type { Offer } from "./types/Offer";

const CATALOGUE: Product[] = [
  { code: "R01", name: "Red Widget", price: 3295, image: "red.jpg" },
  { code: "G01", name: "Green Widget", price: 2495, image: "green.jpg" },
  { code: "B01", name: "Blue Widget", price: 795, image: "blue.jpg" },
];

const DELIVERY_RULES: DeliveryRule[] = [
  { amountSpent: 9000, fee: 0 },
  { amountSpent: 5000, fee: 295 },
  { amountSpent: 0, fee: 495 },
];

const OFFERS: Offer[] = [
  {
    productCode: "R01",
    value: 0.5,
    type: "BOGO",
  },
];

const SPECIAL_OFFERS_CONTENT: { title: string; description: string }[] = [
  {
    title: "Buy One Get One 50% off on Red Widgets!",
    description: "Only for 2 weeks! Buy one Red Widget and the second with 50% off.",
  },
  {
    title: "The more you buy, the more you save!",
    description: "Spend over $50 and get $2.95 off your delivery fee. Spend over $90 and get free delivery!",
  },
];

export { CATALOGUE, DELIVERY_RULES, OFFERS, SPECIAL_OFFERS_CONTENT };
