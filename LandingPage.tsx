export interface PriceIntel {
  item: string;
  mandi: number;
  zepto: number;
  blinkit: number;
  lastCheapest: 'mandi' | 'zepto' | 'blinkit';
}

export const mockPriceIntel: PriceIntel[] = [
  { item: "Tomato", mandi: 25, zepto: 45, blinkit: 42, lastCheapest: 'mandi' },
  { item: "Onion", mandi: 30, zepto: 55, blinkit: 52, lastCheapest: 'mandi' },
  { item: "Milk (1L)", mandi: 60, zepto: 68, blinkit: 66, lastCheapest: 'mandi' },
  { item: "Bread", mandi: 40, zepto: 45, blinkit: 45, lastCheapest: 'mandi' },
  { item: "Eggs (6pcs)", mandi: 42, zepto: 54, blinkit: 52, lastCheapest: 'mandi' },
];

export async function getRealTimePrices(): Promise<PriceIntel[]> {
  // Bro, this is where you'll connect your UiPath JSON later.
  // For now, enjoy the mock scene.
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPriceIntel), 800);
  });
}
