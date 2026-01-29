import { users } from "@/database/schema";

export type User = typeof users.$inferSelect;
