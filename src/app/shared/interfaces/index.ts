interface IStock {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

interface IPageable<T> {
  count: number;
  result: T[];
}

interface IStockData {
  data: IStock;
  prices: IStockPrices;
}

interface IStockPrices {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

interface ISentiment {
  symbol?: string;
  year: number;
  month: number;
  change?: number;
  mspr?: number;
}

export {
  IStock,
  IPageable,
  IStockPrices,
  IStockData,
  ISentiment
}
