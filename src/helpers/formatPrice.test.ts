import { describe, it, expect } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("should format cents into dollars with two decimal places", () => {
    expect(formatPrice(3295)).toBe("$32.95");
    expect(formatPrice(2495)).toBe("$24.95");
    expect(formatPrice(795)).toBe("$7.95");
  });

  it("should handle single digit cents", () => {
    expect(formatPrice(5)).toBe("$0.05");
  });

  it("should handle double digit cents under 100", () => {
    expect(formatPrice(50)).toBe("$0.50");
  });

  it("should handle zero cents", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("should handle large values", () => {
    expect(formatPrice(100000)).toBe("$1000.00");
  });
});
