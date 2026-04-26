import { database } from "@/database";
import { accounts } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";

export const useAccounts = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: () => {
      return database.select().from(accounts);
    },
  });
