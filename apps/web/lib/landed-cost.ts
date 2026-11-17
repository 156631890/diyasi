export type LandedCostInput = {
  purchased: number; sellable: number; garment: number; packaging: number;
  development: number; freight: number; importCosts: number;
};
export function calculateLandedCost(input: LandedCostInput) {
  if (Object.values(input).some(n => !Number.isFinite(n) || n < 0)) throw new Error("Enter finite, non-negative costs.");
  if (!Number.isSafeInteger(input.purchased) || !Number.isSafeInteger(input.sellable) || input.purchased < 1 || input.sellable < 1 || input.sellable > input.purchased) {
    throw new Error("Quantities must be whole numbers. Sellable quantity must be between 1 and the purchased quantity.");
  }
  const production = input.purchased * input.garment;
  const packing = input.purchased * input.packaging;
  const total = production + packing + input.development + input.freight + input.importCosts;
  if (!Number.isFinite(total) || total > Number.MAX_SAFE_INTEGER) throw new Error("The combined amount is too large.");
  return { production, packing, total, perPurchased: total / input.purchased, perSellable: total / input.sellable };
}
