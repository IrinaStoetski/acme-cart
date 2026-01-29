import { describe, it, expect } from "vitest";
import { calculateDiscountForOffer } from "./calculateDiscountForOffer";
import type { Product } from "../../types/Product";
import type { Offer } from "../../types/Offer";

describe("calculateDiscountForOffer", () => {
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
    {
      code: "B01",
      name: "Blue Widget",
      price: 795,
      image: "",
    },
  ];

  describe("PERCENTAGE strategy", () => {
    it("should calculate 10% discount on a single item", () => {
      const items = [catalogue[0]];
      const offer: Offer = {
        type: "PERCENTAGE",
        value: 10,
        productCode: "",
      };
      const discount = calculateDiscountForOffer(items, offer);
      // 3295 * 0.1 = 329.5 -> 330
      expect(discount).toBe(330);
    });

    it("should calculate 20% discount on multiple items", () => {
      const items = [catalogue[0], catalogue[1]]; // 3295 + 2495 = 5790
      const offer: Offer = {
        type: "PERCENTAGE",
        value: 20,
        productCode: "",
      };
      const discount = calculateDiscountForOffer(items, offer);
      // 5790 * 0.2 = 1158
      expect(discount).toBe(1158);
    });
  });

  describe("BOGO strategy", () => {
    it("should return 0 if there are no items", () => {
      const items: Product[] = [];
      const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
      const discount = calculateDiscountForOffer(items, offer);
      expect(discount).toBe(0);
    });

    it("should return 0 if there is only one eligible item", () => {
      const items = [catalogue[0]];
      const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
      const discount = calculateDiscountForOffer(items, offer);
      expect(discount).toBe(0);
    });

    it("should calculate full price of 1 item as discount for 2 items (value=1)", () => {
      const items = [catalogue[0], catalogue[0]];
      const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
      const discount = calculateDiscountForOffer(items, offer);
      expect(discount).toBe(3295);
    });

    it("should calculate half price of 1 item as discount for 2 items (value=0.5)", () => {
      const items = [catalogue[0], catalogue[0]];
      const offer: Offer = { type: "BOGO", productCode: "R01", value: 0.5 };
      const discount = calculateDiscountForOffer(items, offer);
      // 3295 * 0.5 = 1647.5 -> 1648
      expect(discount).toBe(1648);
    });

    it("should calculate discount for 3 items (only 1 free)", () => {
      const items = [catalogue[0], catalogue[0], catalogue[0]];
      const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
      const discount = calculateDiscountForOffer(items, offer);
      expect(discount).toBe(3295);
    });

    it("should calculate discount for 4 items (2 free)", () => {
      const items = [catalogue[0], catalogue[0], catalogue[0], catalogue[0]];
      const offer: Offer = { type: "BOGO", productCode: "R01", value: 1 };
      const discount = calculateDiscountForOffer(items, offer);
      expect(discount).toBe(3295 * 2);
    });

    it("should round correctly (e.g., half price discount)", () => {
      const items = [catalogue[0], catalogue[0]]; // price 3295
      const offer: Offer = { type: "BOGO", productCode: "R01", value: 0.5 };
      const discount = calculateDiscountForOffer(items, offer);

      expect(discount).toBe(1648);
    });
  });

  describe("DEFAULT strategy", () => {
    it("should return 0 for unknown offer types", () => {
      const items = [catalogue[0]];
      const offer: Offer = {
        // @ts-expect-error unknown offer type
        type: "UNKNOWN",
        value: 10,
        productCode: "",
      };
      const discount = calculateDiscountForOffer(items, offer);
      expect(discount).toBe(0);
    });
  });
});
