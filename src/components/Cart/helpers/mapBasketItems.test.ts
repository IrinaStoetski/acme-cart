import { describe, it, expect } from "vitest";
import { mapBasketItems } from "./mapBasketItems";
import type { Product } from "../../../types/Product";

describe("mapBasketItems", () => {
  const productA: Product = {
    code: "A01",
    name: "Product A",
    price: 1000,
    image: "a.png",
  };
  const productB: Product = {
    code: "B01",
    name: "Product B",
    price: 2000,
    image: "b.png",
  };

  it("should return an empty object for an empty items list", () => {
    expect(mapBasketItems([])).toEqual({});
  });

  it("should map a single item with quantity 1", () => {
    const items = [productA];
    const result = mapBasketItems(items);
    expect(result).toEqual({
      A01: { ...productA, quantity: 1 },
    });
  });

  it("should map multiple unique items with quantity 1", () => {
    const items = [productA, productB];
    const result = mapBasketItems(items);
    expect(result).toEqual({
      A01: { ...productA, quantity: 1 },
      B01: { ...productB, quantity: 1 },
    });
  });

  it("should increment quantity for duplicate items", () => {
    const items = [productA, productA, productB, productA];
    const result = mapBasketItems(items);
    expect(result).toEqual({
      A01: { ...productA, quantity: 3 },
      B01: { ...productB, quantity: 1 },
    });
  });

  it("should not mutate the original product objects", () => {
    const items = [productA];
    const result = mapBasketItems(items);

    expect(result["A01"]).not.toBe(productA);
    // @ts-expect-error quantity does not exist on Product
    expect(productA.quantity).toBeUndefined();
  });
});
