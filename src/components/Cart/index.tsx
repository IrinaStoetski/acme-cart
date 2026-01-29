import Button from "../ui/Button";
import type { Product } from "../../types/Product";
import { EmptyState, ProductsList } from "./components";
import { twMerge } from "tailwind-merge";
import { ShoppingCartIcon } from "lucide-react";
import Heading from "../ui/Heading";
import { formatPrice } from "../../helpers/formatPrice";
import { mapBasketItems } from "./helpers";

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

const Basket = ({ items, subtotal, total, discount, deliveryFee, onRemoveItem, onAddItem, className }: Props) => {
  const itemsMap = mapBasketItems(items);

  return (
    <div className={twMerge("border border-gray-300 rounded-lg p-4 ", className)}>
      <Heading className="flex justify-center items-center gap-2 mb-6">
        <ShoppingCartIcon className="text-blue-300 mr-2" /> Your shopping cart
      </Heading>
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="w-full h-full flex flex-col items-between">
          <ProductsList itemsMap={itemsMap} onRemoveItem={onRemoveItem} onAddItem={onAddItem} />
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

export default Basket;
