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