import type { Product } from "../../../types/Product";

export const calculateSubtotal = (items: Product[], catalog: Product[]) => {
  return items.reduce((sum, product) => {
    const catalogProduct = catalog.find((p) => p.code === product.code);

    return sum + (catalogProduct?.price || 0);
  }, 0);
};
