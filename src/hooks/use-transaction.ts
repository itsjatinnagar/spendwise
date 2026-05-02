import { database } from "@/database";
import { accounts, categories, transactions } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";
import { desc, eq, getTableColumns } from "drizzle-orm";

export const useTransaction = (id: string) =>
  useQuery({
    queryKey: ["transactions", id],
    queryFn: () => {
      return database
        .select({
          ...getTableColumns(transactions),
          account: accounts.name,
          category: categories.name,
        })
        .from(transactions)
        .innerJoin(accounts, eq(accounts.id, transactions.accountId))
        .innerJoin(categories, eq(categories.id, transactions.categoryId))
        .where(eq(transactions.id, id));
    },
    select: (data) => data[0] ?? null,
  });
