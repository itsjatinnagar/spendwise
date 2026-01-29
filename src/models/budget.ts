import { budgets } from "@/database/schema";

export type Budget = typeof budgets.$inferSelect;
