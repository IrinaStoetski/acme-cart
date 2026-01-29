import { describe, it, expect } from "vitest";
import { calculateAmountForPercentageDiscount } from "./calculateAmountForPercentageDiscount";
import type { Product } from "../../../types/Product";
import type { Offer } from "../../../types/Offer";

describe("calculateAmountForPercentageDiscount", () => {
  const catalogue: Product[] = [
    {
      code: "R01",
      name: "Red Widget",
      price: 3295,
      image: "",
    },
    {
      code: "G01",
      name: "Green Widget",
      price: 2495,
      image: "",
    },
  ];

  it("should calculate 10% discount on a single item", () => {
    const items = [catalogue[0]];
    const offer: Offer = {
      type: "PERCENTAGE",
      value: 10,
      productCode: "",
    };
    const discount = calculateAmountForPercentageDiscount(items, offer);

    expect(discount).toBe(330);
  });

  it("should calculate 20% discount on multiple items", () => {
    const items = [catalogue[0], catalogue[1]];
    const offer: Offer = {
      type: "PERCENTAGE",
      value: 20,
      productCode: "",
    };
    const discount = calculateAmountForPercentageDiscount(items, offer);

    expect(discount).toBe(1158);
  });

  it("should return 0 if no items are provided", () => {
    const items: Product[] = [];
    const offer: Offer = {
      type: "PERCENTAGE",
      value: 10,
      productCode: "",
    };
    const discount = calculateAmountForPercentageDiscount(items, offer);

    expect(discount).toBe(0);
  });

  it("should handle rounding correctly for small percentages", () => {
    const items = [{ code: "T01", name: "Test", price: 100, image: "" }];
    const offer: Offer = {
      type: "PERCENTAGE",
      value: 0.5,
      productCode: "",
    };
    const discount = calculateAmountForPercentageDiscount(items, offer);

    expect(discount).toBe(1);
  });
});
