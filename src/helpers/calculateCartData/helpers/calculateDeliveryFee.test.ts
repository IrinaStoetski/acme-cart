import { describe, it, expect } from "vitest";
import { calculateDeliveryFee } from "./calculateDeliveryFee";
import type { DeliveryRule } from "../../../types/DeliveryRule";

describe("calculateDeliveryFee", () => {
  const deliveryRules: DeliveryRule[] = [
    { amountSpent: 0, fee: 495 },
    { amountSpent: 5000, fee: 295 },
    { amountSpent: 9000, fee: 0 },
  ];

  it("should return 0 fee and correct total when itemsCount is 0", () => {
    const result = calculateDeliveryFee({
      discountedSubtotal: 0,
      deliveryRules,
      itemsCount: 0,
    });
    expect(result).toBe(0);
  });

  it("should apply highest fee when subtotal is below all thresholds (except 0)", () => {
    const result = calculateDeliveryFee({
      discountedSubtotal: 1000,
      deliveryRules,
      itemsCount: 1,
    });
    expect(result).toBe(495);
  });

  it("should apply mid-tier fee when subtotal is above first threshold", () => {
    const result = calculateDeliveryFee({
      discountedSubtotal: 5500,
      deliveryRules,
      itemsCount: 2,
    });
    expect(result).toBe(295);
  });

  it("should apply free delivery when subtotal is above highest threshold", () => {
    const result = calculateDeliveryFee({
      discountedSubtotal: 9500,
      deliveryRules,
      itemsCount: 3,
    });
    expect(result).toBe(0);
  });

  it("should handle boundary conditions correctly (exactly 5000)", () => {
    const result = calculateDeliveryFee({
      discountedSubtotal: 5000,
      deliveryRules,
      itemsCount: 2,
    });
    expect(result).toBe(295);
  });

  it("should handle boundary conditions correctly (exactly 9000)", () => {
    const result = calculateDeliveryFee({
      discountedSubtotal: 9000,
      deliveryRules,
      itemsCount: 3,
    });
    expect(result).toBe(0);
  });

  it("should work even if rules are not sorted", () => {
    const unsortedRules = [
      { amountSpent: 5000, fee: 295 },
      { amountSpent: 0, fee: 495 },
      { amountSpent: 9000, fee: 0 },
    ];
    const result = calculateDeliveryFee({
      discountedSubtotal: 6000,
      deliveryRules: unsortedRules,
      itemsCount: 1,
    });
    expect(result).toBe(295);
  });
});
