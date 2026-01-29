export const formatPrice = (priceInCents: number): string => {
  const dollars = (priceInCents / 100).toFixed(2);

  return `$${dollars}`;
};
