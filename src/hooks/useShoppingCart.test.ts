import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useShoppingCart } from "./useShoppingCart";
import type { Product } from "../types/Product";
import type { DeliveryRule } from "../types/DeliveryRule";
import type { Offer } from "../types/Offer";

const catalog: Product[] = [
  { code: "R01", name: "Red Widget", price: 3295, image: "" },
  { code: "G01", name: "Green Widget", price: 2495, image: "" },
  { code: "B01", name: "Blue Widget", price: 795, image: "" },
];

const deliveryRules: DeliveryRule[] = [
  { amountSpent: 0, fee: 495 },
  { amountSpent: 5000, fee: 295 },
  { amountSpent: 9000, fee: 0 },
];

const offers: Offer[] = [{ productCode: "R01", type: "BOGO", value: 0.5 }];

describe("useShoppingCart", () => {
  it("should initialize with an empty basket", () => {
    const { result } = renderHook(() => useShoppingCart({ catalog, deliveryRules, offers }));

    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.discount).toBe(0);
    expect(result.current.deliveryFee).toBe(0);
  });

  it("should add items to the basket", () => {
    const { result } = renderHook(() => useShoppingCart({ catalog, deliveryRules, offers }));

    act(() => {
      result.current.add("R01");
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].code).toBe("R01");
    expect(result.current.subtotal).toBe(3295);
    expect(result.current.deliveryFee).toBe(495);
    expect(result.current.total).toBe(3790);
  });

  it("should remove items from the basket", () => {
    const { result } = renderHook(() => useShoppingCart({ catalog, deliveryRules, offers }));

    act(() => {
      result.current.add("R01");
      result.current.add("G01");
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.remove("R01");
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].code).toBe("G01");
    expect(result.current.subtotal).toBe(2495);
  });

  it("should calculate discounts and delivery fees correctly", () => {
    const { result } = renderHook(() => useShoppingCart({ catalog, deliveryRules, offers }));

    act(() => {
      result.current.add("R01");
      result.current.add("R01");
    });

    expect(result.current.subtotal).toBe(6590);
    expect(result.current.discount).toBe(1648);
    expect(result.current.deliveryFee).toBe(495);
    expect(result.current.total).toBe(5437);
  });

  it("should handle free delivery for high values", () => {
    const { result } = renderHook(() => useShoppingCart({ catalog, deliveryRules, offers: [] }));

    act(() => {
      result.current.add("R01");
      result.current.add("R01");
      result.current.add("R01");
    });

    // 3295 * 3 = 9885
    expect(result.current.subtotal).toBe(9885);
    expect(result.current.deliveryFee).toBe(0);
    expect(result.current.total).toBe(9885);
  });

  it("should not add non-existent products", () => {
    const { result } = renderHook(() => useShoppingCart({ catalog, deliveryRules, offers }));

    act(() => {
      result.current.add("NON_EXISTENT");
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("should handle removing items that are not in the basket gracefully", () => {
    const { result } = renderHook(() => useShoppingCart({ catalog, deliveryRules, offers }));

    act(() => {
      result.current.add("R01");
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.remove("G01");
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].code).toBe("R01");
  });
});
