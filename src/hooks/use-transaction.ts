import { database } from "@/database";
import { transactions, wallets } from "@/database/schema";
import { TransactionType } from "@/models/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { desc, eq, sql } from "drizzle-orm";

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      return await database.select().from(transactions);
    },
  });
};

export const useRecentTransactions = () => {
  return useQuery({
    queryKey: ["transactions", "recents"],
    queryFn: async () => {
      return await database
        .select()
        .from(transactions)
        .limit(4)
        .orderBy(desc(transactions.timestamp));
    },
  });
};

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: async () => {
      return (
        await database
          .select()
          .from(transactions)
          .where(eq(transactions.id, id))
      ).at(0);
    },
  });
};

export const useCreateTransaction = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (transaction: typeof transactions.$inferInsert) => {
      await database.transaction(async (tx) => {
        await tx.insert(transactions).values(transaction);

        const currentBalance =
          transaction.type === TransactionType.EXPENSE
            ? sql`${wallets.currentBalance} - ${transaction.amount}`
            : sql`${wallets.currentBalance} + ${transaction.amount}`;

        await tx
          .update(wallets)
          .set({ currentBalance })
          .where(eq(wallets.id, transaction.walletId));
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["transactions"] });
      client.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
};

export const useDeleteTransaction = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (transaction: typeof transactions.$inferSelect) => {
      return await database.transaction(async (tx) => {
        const currentBalance =
          transaction.type === TransactionType.EXPENSE
            ? sql`${wallets.currentBalance} + ${transaction.amount}`
            : sql`${wallets.currentBalance} - ${transaction.amount}`;

        await tx
          .update(wallets)
          .set({ currentBalance })
          .where(eq(wallets.id, transaction.walletId));
        await tx
          .delete(transactions)
          .where(eq(transactions.id, transaction.id));
      });
    },
    onSuccess: (_, variables) => {
      client.removeQueries({ queryKey: ["transactions", variables.id] });
      client.invalidateQueries({ queryKey: ["transactions"] });
      client.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
};
