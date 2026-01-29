import { database } from "@/database";
import { transfers, wallets } from "@/database/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eq, sql } from "drizzle-orm";

export const useTransfers = () => {
  return useQuery({
    queryKey: ["transfers"],
    queryFn: async () => {
      return await database.select().from(transfers);
    },
  });
};

export const useCreateTransfer = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (transfer: typeof transfers.$inferInsert) => {
      await database.transaction(async (tx) => {
        await tx.insert(transfers).values(transfer);
        await tx
          .update(wallets)
          .set({
            currentBalance: sql`${wallets.currentBalance} - ${transfer.amount}`,
          })
          .where(eq(wallets.id, transfer.fromWallet));
        await tx
          .update(wallets)
          .set({
            currentBalance: sql`${wallets.currentBalance} + ${transfer.amount}`,
          })
          .where(eq(wallets.id, transfer.toWallet));
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["transfers"] });
      client.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
};
