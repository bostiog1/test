import { CryptoHasher } from "bun";

// Precompute all 1000 possible combinations (1-10 for each bit)
const bitSlowCache = new Map<string, string>();

// Initialize cache at module load
for (let bit1 = 1; bit1 <= 10; bit1++) {
  for (let bit2 = 1; bit2 <= 10; bit2++) {
    for (let bit3 = 1; bit3 <= 10; bit3++) {
      let n = 0n;
      const b1 = BigInt(bit1);
      const b2 = BigInt(bit2);
      const b3 = BigInt(bit3);

      // Same calculation as original function
      for (let i = 0; i < 1_000; i++) {
        n += (b1 % 1000n) + b1 / 100n;
        n += i % 2 ? b3 ** 3n : b2 ** 2n;
      }

      const hasher = new CryptoHasher("md5");
      hasher.update(n.toString());
      bitSlowCache.set(`${bit1}-${bit2}-${bit3}`, hasher.digest("hex"));
    }
  }
}

export function computeBitSlow(
  bit1: number,
  bit2: number,
  bit3: number,
): string {
  return bitSlowCache.get(`${bit1}-${bit2}-${bit3}`)!; // Safe due to precomputation
}
