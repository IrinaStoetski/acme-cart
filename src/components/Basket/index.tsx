import Button from "../ui/Button";
import type { Product } from "../../types/Product";
import QuantityButton from "./helpers/components/QuantityButton";
import { EmptyState } from "./helpers/components";

interface Props {
  items: Product[];
  deliveryFee: number;
  total: number;
  onRemoveItem: (code: string) => void;
  onAddItem: (code: string) => void;
}

export const Basket = ({ items, total, deliveryFee, onRemoveItem, onAddItem }: Props) => {
  const itemsMap: { [key: string]: Product & { quantity: number } } = {};

  items.forEach((item) => {
    if (itemsMap[item.code]) {
      itemsMap[item.code].quantity += 1;
    } else {
      itemsMap[item.code] = { ...item, quantity: 1 };
    }
  });

  return (
    <div className="border border-gray-300 rounded-lg p-4 mt-4 flex flex-col items-end">
      <h2 className="text-2xl w-full font-semibold mb-8 text-center">Your shopping cart</h2>
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
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
                <span className="price text-right">${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 mt-4">
            <div className="subtotal">
              <span className="font-semibold">Subtotal:</span> ${total - deliveryFee}
            </div>
            <div className="delivery">
              <span className="font-semibold">Delivery:</span> ${deliveryFee}
            </div>
            <div className="total">
              <span className="font-semibold">Total:</span> ${total}
            </div>
          </div>
          <Button className="mt-5">Proceed to checkout</Button>
        </>
      )}
    </div>
  );
};
