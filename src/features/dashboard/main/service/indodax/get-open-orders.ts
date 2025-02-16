export async function getTradeHistory(pair: string) {
    const response = await fetch(`/api/indodax/open-orders/${pair}`);
    if (!response.ok) {
      throw new Error("Failed to fetch open orders");
    }
    return response.json();
  }
  