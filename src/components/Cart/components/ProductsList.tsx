import type { Product } from "../../../types/Product";
import { formatPrice } from "../../../helpers/formatPrice";
import { QuantityButton } from "./index";
import { PlusIcon, MinusIcon } from "lucide-react";

interface ProductsListProps {
  itemsMap: { [key: string]: Product & { quantity: number } };
  onRemoveItem: (code: string) => void;
  onAddItem: (code: string) => void;
}

const ProductsList = ({ itemsMap, onRemoveItem, onAddItem }: ProductsListProps) => (
  <ul className="w-full">
    {Object.values(itemsMap).map((item) => (
      <li key={item.code} className="grid grid-cols-3 justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <span className="font-bold">{item.name}</span>
        <div className="flex items-center gap-2">
          <QuantityButton onPress={() => onRemoveItem(item.code)}>
            <MinusIcon size={16} />
          </QuantityButton>
          <span className="quantity">{item.quantity}</span>
          <QuantityButton onPress={() => onAddItem(item.code)}>
            <PlusIcon size={16} />
          </QuantityButton>
        </div>
        <span className="price text-right">{formatPrice(item.price * item.quantity)}</span>
      </li>
    ))}
  </ul>
);

export default ProductsList;
