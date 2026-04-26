import { database } from "@/database";
import { parsedTxns } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

export const useParsedTxn = (id: string) =>
  useQuery({
    queryKey: ["parsed_txns", id],
    queryFn: async () => {
      const rows = await database
        .select()
        .from(parsedTxns)
        .where(eq(parsedTxns.id, id));
      if (!rows[0]) return null;
      return rows[0];
    },
  });
