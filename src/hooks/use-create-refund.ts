import { database } from "@/database";
import { categories, transactions } from "@/database/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

type Params = {
  id: string;
  relatedTxn: string;
};

export const useCreateRefund = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, relatedTxn }: Params) => {
      const result = await database
        .select()
        .from(categories)
        .where(eq(categories.name, "Refund"));
      const categoryId = result[0].id;
      await database
        .update(transactions)
        .set({ categoryId, relatedTxn })
        .where(eq(transactions.id, id));
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
