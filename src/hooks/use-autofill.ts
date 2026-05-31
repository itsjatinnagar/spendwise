import { database } from "@/database";
import {
  categories,
  parsedTxns,
  ParsedTxnStatus,
  transactions,
} from "@/database/schema";
import { inferCategory } from "@/utilities/autofill";
import { useQuery } from "@tanstack/react-query";
import { eq, getTableColumns } from "drizzle-orm";

export const useAutofill = (description: string, statementId: string) =>
  useQuery({
    queryKey: ["autofill", description],
    queryFn: async () => {
      const committed = await database
        .select({ ...getTableColumns(transactions) })
        .from(transactions)
        .innerJoin(categories, eq(categories.id, transactions.categoryId));
      const committedHistory = committed.map((row) => ({
        description: row.description,
        categoryId: row.categoryId,
        note: row.note,
        timestamp: row.timestamp,
      }));
      const parsed = await database
        .select()
        .from(parsedTxns)
        .where(eq(parsedTxns.statementId, statementId));
      const parsedHistory = parsed
        .filter(
          (row): row is typeof row & { categoryId: string } =>
            row.status === ParsedTxnStatus.APPROVED && row.categoryId !== null,
        )
        .map((row) => ({
          description: row.description,
          categoryId: row.categoryId,
          note: row.note,
          timestamp: row.timestamp,
        }));
      const history = [...committedHistory, ...parsedHistory];
      return inferCategory(description, history);
    },
  });
