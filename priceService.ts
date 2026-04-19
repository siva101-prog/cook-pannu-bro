export interface PriceIntel {
  item: string;
  mandi: number;
  blinkit: number;
  zepto: number;
  lastCheapest: string;
}

export const getRealTimePrices = async (): Promise<PriceIntel[]> => {
  // This is a placeholder. Later, you can connect your UiPath scraper here!
  return [
    { item: 'Tomatoes (1kg)', mandi: 30, blinkit: 52, zepto: 48, lastCheapest: 'mandi' },
    { item: 'Onions (1kg)', mandi: 25, blinkit: 45, zepto: 42, lastCheapest: 'mandi' },
    { item: 'Milk (1L)', mandi: 60, blinkit: 66, zepto: 66, lastCheapest: 'mandi' },
    { item: 'Eggs (6pcs)', mandi: 42, blinkit: 55, zepto: 52, lastCheapest: 'mandi' },
  ];
};
