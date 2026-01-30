import { database } from "@/database";
import { categories, transactions } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";

export const useMonthlyStatistics = (date: Date) => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const start = new Date(
        date.getFullYear(),
        date.getMonth(),
        1,
      ).toISOString();
      const end = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
      ).toISOString();
      const amountSQL = sql<number>`SUM(${transactions.amount})`;

      const result = await database
        .select({
          id: categories.id,
          category: categories.name,
          type: transactions.type,
          amount: amountSQL,
        })
        .from(transactions)
        .innerJoin(categories, eq(transactions.categoryId, categories.id))
        .where(
          and(
            gte(transactions.timestamp, start),
            lte(transactions.timestamp, end),
          ),
        )
        .groupBy(categories.id)
        .orderBy(desc(amountSQL));
      return result;
    },
  });
};
