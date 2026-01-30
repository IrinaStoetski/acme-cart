import { describe, it, expect } from "vitest";
import { calculateSubtotal } from "./calculateSubtotal";
import type { Product } from "../../../types/Product";

describe("calculateSubtotal", () => {
  const catalog: Product[] = [
    { code: "R01", name: "Red Widget", price: 3295, image: "" },
    { code: "G01", name: "Green Widget", price: 2495, image: "" },
    { code: "B01", name: "Blue Widget", price: 795, image: "" },
  ];

  it("should return 0 for an empty items list", () => {
    expect(calculateSubtotal([], catalog)).toBe(0);
  });

  it("should calculate correctly for a single item", () => {
    expect(calculateSubtotal([catalog[0]], catalog)).toBe(3295);
  });

  it("should calculate correctly for multiple items", () => {
    expect(calculateSubtotal([catalog[0], catalog[1], catalog[2]], catalog)).toBe(3295 + 2495 + 795);
  });

  it("should ignore items not in the catalog (price 0)", () => {
    const unknownProduct: Product = { code: "X01", name: "Unknown", price: 1000, image: "" };
    expect(calculateSubtotal([unknownProduct], catalog)).toBe(0);
  });

  it("should handle mixed known and unknown items", () => {
    const unknownProduct: Product = { code: "X01", name: "Unknown", price: 1000, image: "" };
    expect(calculateSubtotal([catalog[0], unknownProduct], catalog)).toBe(3295);
  });
});
