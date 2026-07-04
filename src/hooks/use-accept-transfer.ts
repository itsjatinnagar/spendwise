import { database } from "@/database";
import { categories, transactions } from "@/database/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

type Params = {
  creditId: string;
  debitId: string;
};

export const useAcceptTransfer = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ creditId, debitId }: Params) => {
      // Look up Transfer In and Transfer Out system categories
      const allCategories = await database.select().from(categories);

      const transferInCategory = allCategories.find(
        (c) => c.name === "Transfer In",
      );
      const transferOutCategory = allCategories.find(
        (c) => c.name === "Transfer Out",
      );

      if (!transferInCategory || !transferOutCategory) {
        throw new Error(
          "Transfer categories not found. Please ensure 'Transfer In' and 'Transfer Out' system categories exist.",
        );
      }

      await database.transaction(async (tx) => {
        // Credit side → Transfer In
        await tx
          .update(transactions)
          .set({
            relatedTxn: debitId,
            categoryId: transferInCategory.id,
          })
          .where(eq(transactions.id, creditId));

        // Debit side → Transfer Out
        await tx
          .update(transactions)
          .set({
            relatedTxn: creditId,
            categoryId: transferOutCategory.id,
          })
          .where(eq(transactions.id, debitId));
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["transactions"] });
      client.invalidateQueries({ queryKey: ["potential-transfers"] });
    },
  });
};
