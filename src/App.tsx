import { Basket } from "./components/Basket";
import Catalogue from "./components/Catalogue";
import SpecialOffers from "./components/SpecialOffers";

import { CATALOGUE, DELIVERY_RULES, OFFERS, SPECIAL_OFFERS_CONTENT } from "./config";
import { useBasket } from "./hooks/useBasket";

function App() {
  const { items, add, remove, total, discount, deliveryFee, subtotal } = useBasket(CATALOGUE, OFFERS, DELIVERY_RULES);

  return (
    <>
      <div className="grid xl:grid-cols-[2fr_1fr] gap-3 xl:gap-8 p-4 xl:p-8">
        <Catalogue addProduct={add} removeProduct={remove} items={CATALOGUE} />
        <div className="flex flex-col xl:gap-2 gap-12">
          <SpecialOffers data={SPECIAL_OFFERS_CONTENT} />
          <Basket
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            className="flex-1"
            items={items}
            total={total}
            onAddItem={add}
            onRemoveItem={remove}
          />
        </div>
      </div>
    </>
  );
}

export default App;
