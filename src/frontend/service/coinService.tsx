import { Coin } from "../types";
import Endpoints from "../utils/Endpoints";

export async function fetchCoins(): Promise<Coin[]> {
  try {
    const response = await fetch(Endpoints.coins, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch coins");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
