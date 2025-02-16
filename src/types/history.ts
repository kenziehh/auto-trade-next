export interface History {
  currency: string;
  pair: string;
  trade_id: string;
  order_id: string;
  type: string;
  price: string;
  fee: string;
  trade_time: string;
  client_order_id: string;
  [key: string]: string;
}
