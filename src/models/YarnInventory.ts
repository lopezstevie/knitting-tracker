export interface YarnInventory {
    id?: string;
    brand: string;
    name: string;
    color: string;
    weight: string;
    fiber_content: { fiber: string; percentage: number }[];
    yards_per_ball: number;
    total_yards_used: number;
    remaining_yards: number;
    total_spent: number;
    purchase_ids: string[];
}
  