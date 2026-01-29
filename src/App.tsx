import Basket from "./components/Cart";
import Catalog from "./components/Catalog";
import SpecialOffers from "./components/SpecialOffers";

import { CATALOGUE, DELIVERY_RULES, OFFERS, SPECIAL_OFFERS_CONTENT } from "./config";
import { useShoppingCart } from "./hooks/useShoppingCart";

function App() {
  const { items, add, remove, total, discount, deliveryFee, subtotal } = useShoppingCart({
    catalog: CATALOGUE,
    offers: OFFERS,
    deliveryRules: DELIVERY_RULES,
  });

  return (
    <>
      <div className="grid xl:grid-cols-[2fr_1fr] gap-3 xl:gap-8 p-4 xl:p-8">
        <Catalog onAddButtonPress={add} items={CATALOGUE} />
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
