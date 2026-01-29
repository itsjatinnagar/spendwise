import { transfers } from "@/database/schema";

export type Transfer = typeof transfers.$inferSelect;
