import Accordion from "./components/ui/Accordion";
import Widget from "./components/Widget";
import { CATALOGUE, DELIVERY_RULES, OFFERS } from "./config";
import { useBasket } from "./hooks/useBasket";

function App() {
  const { items, add, remove, total: basketTotal } = useBasket(CATALOGUE, OFFERS, DELIVERY_RULES);

  console.log(items, basketTotal);

  return (
    <>
      <Accordion
        items={[
          {
            id: "section1",
            title: "Section 1",
            content: <p>This is the content of Section 1.</p>,
          },
          {
            id: "section2",
            title: "Section 2",
            content: <p>This is the content of Section 2.</p>,
          },
          {
            id: "section3",
            title: "Section 3",
            content: <p>This is the content of Section 3.</p>,
          },
        ]}
      />
      <div className="w-1/3 flex flex-col gap-4 mt-4">
        {CATALOGUE.map((product) => (
          <Widget
            key={product.code}
            imageSrc={`/images/widgets/${product.image}`}
            title={product.name}
            price={product.price}
            onAddButtonPress={() => add(product.code)}
            onRemoveButtonPress={() => remove(product.code)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
