export interface AssetProp {
  id: string;
  fiat: string;
  name: string;
  symbol: string;
  price: number;
  amount: number;
  image: string;
  change: number;
  yield: number;
  initialInvestment: number;
  currentInvestment: number;
  nextYield: number;
  tnx: string;
}

export interface TradeWindowProp {
  className?: string;
  token: TradeWindowToken[];
  stablecoins?: TradeWindowToken[];
}

export interface TradeWindowToken {
  id: string;
  name: string;
  icon: string;
  amount: number;
  ratio: number;
  fiat: string;
  symbol: string;
}

export interface TradeWindowTokenComboBox extends TradeWindowToken {
  value: string;
  label: string;
}

export type Timeframe = "24H" | "7D" | "30D" | "90D" | "1Y";
export type BondType = "ALL" |"USD" | "EUR" | "GBP" | "CETES" | "EUROB";

export interface ChartTokenData {
  date: Date;
  price: number;
  volume: number;
  yield?: number;
  bondType: BondType;
}