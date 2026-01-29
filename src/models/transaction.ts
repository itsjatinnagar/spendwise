import { transactions } from "@/database/schema";

export enum TransactionType {
  EXPENSE = 1,
  INCOME = 2,
  REFUND = 3,
}

export type Transaction = typeof transactions.$inferSelect;
