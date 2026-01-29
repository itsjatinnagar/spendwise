import { categories } from "@/database/schema";

export enum CategoryType {
  EXPENSE = 1,
  INCOME = 2,
}

export type Category = typeof categories.$inferSelect;
