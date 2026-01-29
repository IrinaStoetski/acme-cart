import type { Product } from "./types/Product";
import type { DeliveryRule } from "./types/DeliveryRule";
import type { Offer } from "./types/Offer";

const CATALOGUE: Product[] = [
  { code: "R01", name: "Red Widget", price: 32.95, image: "red.jpg" },
  { code: "G01", name: "Green Widget", price: 24.95, image: "green.jpg" },
  { code: "B01", name: "Blue Widget", price: 7.95, image: "blue.jpg" },
];

const DELIVERY_RULES: DeliveryRule[] = [
  { amountSpent: 90, fee: 0 },
  { amountSpent: 50, fee: 2.95 },
  { amountSpent: 0, fee: 4.95 },
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
