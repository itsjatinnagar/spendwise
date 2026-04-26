import { database } from "@/database";
import { accounts, categories, transactions } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";
import { desc, eq, getTableColumns } from "drizzle-orm";

export const useTransactions = () =>
  useQuery({
    queryKey: ["transactions"],
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
        .orderBy(desc(transactions.timestamp));
    },
  });
