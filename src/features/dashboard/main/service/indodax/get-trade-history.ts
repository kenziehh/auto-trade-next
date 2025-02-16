export async function getTradeHistory(pair: string) {
  const response = await fetch(`/api/indodax/trade-history/${pair}`);
  if (!response.ok) {
    throw new Error("Failed to fetch trade history");
  }
  return response.json();
}
