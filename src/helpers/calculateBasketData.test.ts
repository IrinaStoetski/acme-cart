import { describe, it, expect } from "vitest";
import { calculateBasketData } from "./calculateBasketData";
import type { Product } from "../types/Product";
import type { DeliveryRule } from "../types/DeliveryRule";

import type { Offer } from "../types/Offer";

describe("calculateBasketData", () => {
  const catalogue: Product[] = [
    { code: "R01", name: "Red Widget", price: 3295, image: "" },
    { code: "G01", name: "Green Widget", price: 2495, image: "" },
    { code: "B01", name: "Blue Widget", price: 795, image: "" },
  ];

  const deliveryRules: DeliveryRule[] = [
    { amountSpent: 0, fee: 495 },
    { amountSpent: 5000, fee: 295 },
    { amountSpent: 9000, fee: 0 },
  ];

  it("should return zeros for an empty basket", () => {
    const result = calculateBasketData({
      items: [],
      catalogue,
      deliveryRules,
      offers: [],
    });

    expect(result).toEqual({
      subtotal: 0,
      discount: 0,
      deliveryFee: 0,
      total: 0,
    });
  });

  it("should calculate correctly for a single item with no offers", () => {
    const result = calculateBasketData({
      items: [catalogue[0]],
      catalogue,
      deliveryRules,
      offers: [],
    });

    expect(result.subtotal).toBe(3295);
    expect(result.discount).toBe(0);
    expect(result.deliveryFee).toBe(495);
    expect(result.total).toBe(3790);
  });

  it("should calculate correctly for multiple items with no offers", () => {
    const result = calculateBasketData({
      items: [catalogue[1], catalogue[2]],
      catalogue,
      deliveryRules,
      offers: [],
    });

    expect(result.subtotal).toBe(3290);
    expect(result.deliveryFee).toBe(495);
    expect(result.total).toBe(3785);
  });

  it("should apply discounts correctly", () => {
    const items = [catalogue[0], catalogue[0]];
    const offers: Offer[] = [{ productCode: "R01", type: "BOGO", value: 0.5 }];

    const result = calculateBasketData({
      items,
      catalogue,
      deliveryRules,
      offers,
    });

    expect(result.subtotal).toBe(6590);
    expect(result.discount).toBe(1648);
    expect(result.deliveryFee).toBe(495);
    expect(result.total).toBe(5437);
  });

  it("should apply free delivery for subtotal >= 9000", () => {
    const result = calculateBasketData({
      items: [catalogue[0], catalogue[0], catalogue[0]],
      catalogue,
      deliveryRules,
      offers: [],
    });

    expect(result.subtotal).toBe(9885);
    expect(result.deliveryFee).toBe(0);
    expect(result.total).toBe(9885);
  });

  it("should apply mid-tier delivery fee for subtotal >= 5000 and < 9000", () => {
    const result = calculateBasketData({
      items: [catalogue[0], catalogue[1]],
      catalogue,
      deliveryRules,
      offers: [],
    });

    expect(result.subtotal).toBe(5790);
    expect(result.deliveryFee).toBe(295);
    expect(result.total).toBe(6085);
  });
});
