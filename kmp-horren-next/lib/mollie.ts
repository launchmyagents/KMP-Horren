import createMollieClient, { MollieClient } from "@mollie/api-client";

let mollieClient: MollieClient | null = null;

export function getMollieClient(): MollieClient {
  if (!mollieClient) {
    const apiKey = process.env.MOLLIE_API_KEY;
    if (!apiKey) {
      throw new Error("MOLLIE_API_KEY is not configured");
    }
    mollieClient = createMollieClient({ apiKey });
  }
  return mollieClient;
}

export function formatAmountForMollie(amount: number): string {
  return amount.toFixed(2);
}
