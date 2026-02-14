export type ShippingOption = {
  id: string;
  name: string;
  price: number;
  duration: string;
  icon: string;
};

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, duration: '5-7 days', icon: 'truck' },
  { id: 'express', name: 'Express Shipping', price: 12.99, duration: '2-3 days', icon: 'plane' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, duration: '1 day', icon: 'rocket' },
];