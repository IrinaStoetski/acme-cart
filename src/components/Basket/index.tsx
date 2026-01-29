import Button from "../ui/Button";
import type { Product } from "../../types/Product";
import QuantityButton from "./helpers/components/QuantityButton";
import { EmptyState } from "./helpers/components";
import { twMerge } from "tailwind-merge";
import { ShoppingCart } from "lucide-react";
import Heading from "../ui/Heading";
import { formatPrice } from "../../helpers/formatPrice";

interface Props {
  items: Product[];
  deliveryFee: number;
  total: number;
  subtotal: number;
  discount: number;
  className?: string;
  onRemoveItem: (code: string) => void;
  onAddItem: (code: string) => void;
}

export const Basket = ({
  items,
  subtotal,
  total,
  discount,
  deliveryFee,
  onRemoveItem,
  onAddItem,
  className,
}: Props) => {
  const itemsMap: { [key: string]: Product & { quantity: number } } = {};

  items.forEach((item) => {
    if (itemsMap[item.code]) {
      itemsMap[item.code].quantity += 1;
    } else {
      itemsMap[item.code] = { ...item, quantity: 1 };
    }
  });

  return (
    <div className={twMerge("border border-gray-300 rounded-lg p-4 ", className)}>
      <Heading className="flex justify-center items-center gap-2 mb-6">
        <ShoppingCart className="text-blue-300 mr-2" /> Your shopping cart
      </Heading>
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="w-full h-full flex flex-col items-between">
          <ul className="w-full">
            {Object.values(itemsMap).map((item) => (
              <li
                key={item.code}
                className="grid grid-cols-3 justify-between items-center mb-6 border-b border-gray-200 pb-4"
              >
                <span className="font-bold">{item.name}</span>
                <div className="flex items-center gap-2">
                  <QuantityButton onPress={() => onRemoveItem(item.code)}>-</QuantityButton>
                  <span className="quantity">{item.quantity}</span>
                  <QuantityButton onPress={() => onAddItem(item.code)}>+</QuantityButton>
                </div>
                <span className="price text-right">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-end">
            <div className="flex flex-col gap-2 mt-4">
              <div className="subtotal">
                <span className="font-semibold">Subtotal:</span> {formatPrice(subtotal)}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold flex items-center gap-1">Discount:</span>
                {formatPrice(discount)}
              </div>
              <div className="delivery">
                <span className="font-semibold">Delivery:</span> {formatPrice(deliveryFee)}
              </div>
              <div className="total">
                <span className="font-semibold">Total:</span> {formatPrice(total)}
              </div>
            </div>
            <Button className="mt-5">Proceed to checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};
