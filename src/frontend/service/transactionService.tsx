import { Transaction } from "../types";
import Endpoints from "../utils/Endpoints";

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(Endpoints.transactions, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch transactions");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
