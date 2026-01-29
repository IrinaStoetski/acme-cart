import type { Product as ProductModel } from "../../types/Product";
import Heading from "../ui/Heading";
import Product from "../Product";
import { ListChecksIcon } from "lucide-react";

interface Props {
  items: ProductModel[];
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
        <Product
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
