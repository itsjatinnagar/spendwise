import { database } from "@/database";
import { statements } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";
import { desc } from "drizzle-orm";

export const useStatements = () =>
  useQuery({
    queryKey: ["statements"],
    queryFn: () => {
      return database
        .select()
        .from(statements)
        .orderBy(desc(statements.createdAt));
    },
  });
