export async function getPairTrades(pair: string, timeframe?: string) {
  const response = await fetch(
    `/api/indodax/pairs/${pair}/trades?timeframe=${timeframe ?? "1h"}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch pair trades");
  }
  return response.json();
}
