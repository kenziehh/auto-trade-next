export interface Pair {
  id: string;
  symbol: string;
  base_currency: string;
  traded_currency: string;
  traded_currency_unit: string;
  description: string;
  ticker_id: string;
  volume_precision: number;
  price_precision: number;
  price_round: number;
  pricescale: number;
  trade_min_base_currency: number;
  trade_min_traded_currency: number;
  has_memo: boolean;
  memo_name: boolean;
  trade_fee_percent: number;
  trade_fee_percent_taker: number;
  trade_fee_percent_maker: number;
  url_logo: string;
  url_logo_png: string;
  is_maintenance: number;
  is_market_suspended: number;
  coingecko_id: string;
  cmc_id: number;
}
