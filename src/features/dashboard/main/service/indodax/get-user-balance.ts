export async function getUserBalance() {
  const response = await fetch("/api/indodax/balance");
  if (!response.ok) {
    throw new Error("Failed to fetch balance");
  }
  return response.json();
}
