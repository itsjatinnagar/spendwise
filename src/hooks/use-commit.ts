import { database } from "@/database";
import {
  parsedTxns,
  statements,
  StatementStatus,
  transactions,
} from "@/database/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eq, inArray } from "drizzle-orm";
import * as Crypto from "expo-crypto";

type Params = Array<typeof parsedTxns.$inferSelect>;

export const useCommit = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (params: Params) => {
      await database.transaction(async (tx) => {
        await tx.insert(transactions).values(
          params.map((param) => ({
            id: Crypto.randomUUID(),
            accountId: param.accountId,
            categoryId: param.categoryId!,
            amount: param.amount,
            description: param.description,
            note: param.note,
            timestamp: param.timestamp,
            fingerprint: `${param.amount}|${param.description}|${param.timestamp}`,
          })),
        );
        await tx
          .update(statements)
          .set({ status: StatementStatus.COMPLETED })
          .where(eq(statements.id, params[0].statementId));
        await tx.delete(parsedTxns).where(
          inArray(
            parsedTxns.id,
            params.map(({ id }) => id),
          ),
        );
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["statements"] });
      client.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
