import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";

interface Props {
  className?: string;
  title: string;
  price: number;
  imageSrc: string;
  onAddButtonPress?: () => void;
  onRemoveButtonPress?: () => void;
}

const Widget = ({ className, title, price, onAddButtonPress, onRemoveButtonPress, imageSrc }: Props) => (
  <div className={twMerge("border p-2 border-gray-400 rounded-md flex", className)}>
    <img src={imageSrc} alt={title} width={120} height={120} className="my-2 rounded-md aspect-square" />
    <div className="flex flex-col ml-4 mt-1">
      <h3 className="font-medium text-xl mb-1">{title}</h3>
      <p className="text-black">${price.toFixed(2)}</p>
      <div className="flex gap-2 mt-4">
        <Button className="mt-2 inline-flex" onClick={onAddButtonPress}>
          Add
        </Button>
        <Button variant="secondary" className="mt-2 inline-flex" onClick={onRemoveButtonPress}>
          Remove
        </Button>
      </div>
    </div>
  </div>
);

export default Widget;
