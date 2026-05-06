import { database } from "@/database";
import { categories, invests, transactions } from "@/database/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";
import * as Crypto from "expo-crypto";

type Params = {
  accountId: typeof invests.$inferInsert.accountId;
  maturityAmount: typeof invests.$inferInsert.maturityAmount;
  maturityDate: typeof invests.$inferInsert.maturityDate;
  transactionId: typeof invests.$inferInsert.transactionId;
};

export const useCreateInvest = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (params: Params) => {
      const values: typeof invests.$inferInsert = {
        id: Crypto.randomUUID(),
        ...params,
      };
      await database.insert(invests).values(values);
      const result = await database
        .select()
        .from(categories)
        .where(eq(categories.name, "Invest Buy"));
      const categoryId = result[0].id;
      await database
        .update(transactions)
        .set({ categoryId })
        .where(eq(transactions.id, values.transactionId));
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["transactions"] });
      client.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
