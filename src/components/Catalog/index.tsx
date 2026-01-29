import type { Product } from "../../types/Product";
import Heading from "../ui/Heading";
import Widget from "../Widget";
import { ListChecksIcon } from "lucide-react";

interface Props {
  items: Product[];
  onAddButtonPress: (code: string) => void;
}

const Catalog = ({ onAddButtonPress, items }: Props) => (
  <section className="p-4">
    <Heading className="flex items-center gap-2 justify-center">
      <ListChecksIcon className="text-blue-300 mr-2" />
      Catalogue
    </Heading>
    <div className="flex flex-col gap-4 mt-4">
      {items.map((product) => (
        <Widget
          key={product.code}
          imageSrc={`/images/widgets/${product.image}`}
          title={product.name}
          price={product.price}
          onAddButtonPress={() => onAddButtonPress(product.code)}
        />
      ))}
    </div>
  </section>
);

export default Catalog;
