import { database } from "@/database";
import {
  accounts,
  parsedTxns,
  ParsedTxnStatus,
  statements,
  StatementStatus,
} from "@/database/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";

type ResType = {
  amount: number;
  narration: string;
  timestamp: string;
};
const callParser = async (formData: FormData): Promise<ResType[]> => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URI}/parse`, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });
  return res.json();
};

type Params = {
  accountId: typeof accounts.$inferSelect.id;
  fileName: string;
  formData: FormData;
};

export const useParse = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ accountId, fileName, formData }: Params) => {
      const rows = await callParser(formData);

      await database.transaction(async (tx) => {
        const statementId = Crypto.randomUUID();

        await tx.insert(statements).values({
          id: statementId,
          fileName,
          status: StatementStatus.PARSED,
        });

        await tx.insert(parsedTxns).values(
          rows.map((row) => ({
            id: Crypto.randomUUID(),
            accountId,
            amount: row.amount,
            description: row.narration,
            statementId,
            status: ParsedTxnStatus.ORIGINAL,
            timestamp: row.timestamp,
          })),
        );
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["statements"] });
    },
  });
};
