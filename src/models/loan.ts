import { loans } from "@/database/schema";

export type Loan = typeof loans.$inferSelect;
