import { database } from "@/database";
import { parsedTxns } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

export const useParsedTxns = (statementId: string) =>
  useQuery({
    queryKey: ["parsed_txns", statementId],
    queryFn: () => {
      return database
        .select()
        .from(parsedTxns)
        .where(eq(parsedTxns.statementId, statementId));
    },
    enabled: !!statementId,
  });
