import type { DeliveryRule } from "../../../types/DeliveryRule";

type Params = {
  discountedSubtotal: number;
  deliveryRules: DeliveryRule[];
  itemsCount: number;
};

export const calculateDeliveryFee = ({ discountedSubtotal, deliveryRules, itemsCount }: Params) => {
  const sortedRules = [...deliveryRules].sort((a, b) => b.amountSpent - a.amountSpent);
  const deliveryFee =
    itemsCount === 0 ? 0 : sortedRules.find((rule) => discountedSubtotal >= rule.amountSpent)?.fee || 0;

  return deliveryFee;
};
