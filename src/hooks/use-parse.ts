import { database } from "@/database";
import {
  accounts,
  categories,
  parsedTxns,
  ParsedTxnStatus,
  statements,
  StatementStatus,
  transactions,
} from "@/database/schema";
import { inferCategory } from "@/utilities/autofill";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eq, getTableColumns } from "drizzle-orm";
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

      const committed = await database
        .select({
          ...getTableColumns(transactions),
          _categoryId: categories.id,
        })
        .from(transactions)
        .innerJoin(categories, eq(categories.id, transactions.categoryId));
      const history = committed.map((row) => ({
        description: row.description,
        categoryId: row._categoryId,
        note: row.note,
        timestamp: row.timestamp,
      }));

      await database.transaction(async (tx) => {
        const statementId = Crypto.randomUUID();

        await tx.insert(statements).values({
          id: statementId,
          fileName,
          status: StatementStatus.PARSED,
        });

        const values = rows.map((row) => {
          let categoryId = null;
          let note = null;
          const suggestions = inferCategory(row.narration, history);
          const top = suggestions[0];

          if (top) {
            categoryId = top.categoryId;
            note = top.note;
          }

          return {
            id: Crypto.randomUUID(),
            accountId,
            amount: row.amount,
            categoryId,
            description: row.narration,
            note,
            statementId,
            status: ParsedTxnStatus.ORIGINAL,
            timestamp: row.timestamp,
          };
        });

        await tx.insert(parsedTxns).values(values);
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["statements"] });
    },
  });
};
