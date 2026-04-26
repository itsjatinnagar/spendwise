import { database } from "@/database";
import { parsedTxns } from "@/database/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

type Params = typeof parsedTxns.$inferInsert;

export const useUpdateParsedTxn = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (params: Params) => {
      await database
        .update(parsedTxns)
        .set(params)
        .where(eq(parsedTxns.id, params.id));
    },
    onSuccess: (_, { statementId }) => {
      client.invalidateQueries({ queryKey: ["parsed_txns", statementId] });
    },
  });
};
