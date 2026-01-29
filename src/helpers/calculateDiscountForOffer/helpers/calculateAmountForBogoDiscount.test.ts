import { describe, it, expect } from "vitest";
import { calculateAmountForBogoDiscount } from "./calculateAmountForBogoDiscount";
import type { Product } from "../../../types/Product";
import type { Offer } from "../../../types/Offer";

describe("calculateAmountForBogoDiscount", () => {
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

  it("should return 0 if no items match the offer product code", () => {
    const items = [catalogue[1]];
    const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
    const discount = calculateAmountForBogoDiscount(items, offer);

    expect(discount).toBe(0);
  });

  it("should return 0 if only one item matches the offer product code", () => {
    const items = [catalogue[0]];
    const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
    const discount = calculateAmountForBogoDiscount(items, offer);

    expect(discount).toBe(0);
  });

  it("should calculate full price of 1 item as discount for 2 matching items (value=1)", () => {
    const items = [catalogue[0], catalogue[0]];
    const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
    const discount = calculateAmountForBogoDiscount(items, offer);

    expect(discount).toBe(3295);
  });

  it("should calculate half price of 1 item as discount for 2 matching items (value=0.5)", () => {
    const items = [catalogue[0], catalogue[0]];
    const offer: Offer = { type: "BOGO", productCode: "R01", value: 0.5 };
    const discount = calculateAmountForBogoDiscount(items, offer);

    expect(discount).toBe(1648);
  });

  it("should ignore unrelated items", () => {
    const items = [catalogue[0], catalogue[1], catalogue[0]];
    const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
    const discount = calculateAmountForBogoDiscount(items, offer);
    expect(discount).toBe(3295);
  });

  it("should calculate discount for 4 items correctly (2 free)", () => {
    const items = [catalogue[0], catalogue[0], catalogue[0], catalogue[0]];
    const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
    const discount = calculateAmountForBogoDiscount(items, offer);
    expect(discount).toBe(3295 * 2);
  });

  it("should handle missing value by defaulting to 1 (full price discount)", () => {
    const items = [catalogue[0], catalogue[0]];
    // @ts-expect-error testing missing value
    const offer: Offer = { type: "BOGO", productCode: "R01" };
    const discount = calculateAmountForBogoDiscount(items, offer);
    expect(discount).toBe(3295);
  });
});
