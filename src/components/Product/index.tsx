import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import { formatPrice } from "../../helpers/formatPrice";

interface Props {
  className?: string;
  title: string;
  price: number;
  imageSrc: string;
  onAddButtonPress: () => void;
}

const Product = ({ className, title, price, onAddButtonPress, imageSrc }: Props) => (
  <div className={twMerge("shadow-sm border p-2 border-gray-200 rounded-md flex", className)}>
    <img src={imageSrc} alt={title} width={120} height={120} className="my-2 rounded-md aspect-square" />
    <div className="flex flex-col ml-4 mt-1">
      <h3 className="font-medium text-xl mb-1">{title}</h3>
      <p className="text-black font-bold">{formatPrice(price)}</p>
      <div className="flex gap-2 mt-4">
        <Button className="mt-2 inline-flex" onPress={onAddButtonPress}>
          Add
        </Button>
      </div>
    </div>
  </div>
);

export default Product;
