export async function getAllPairs() {
  const response = await fetch(`/api/indodax/pairs`);
  if (!response.ok) {
    throw new Error("Failed to fetch open orders");
  }
  return response.json();
}
