import { database } from "@/database";
import { accounts, AccountStatus } from "@/database/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";

type Params = {
  name: typeof accounts.$inferInsert.name;
  type: typeof accounts.$inferInsert.type;
  bank: typeof accounts.$inferInsert.bank;
};

export const useCreateAccount = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (params: Params) => {
      const values: typeof accounts.$inferInsert = {
        id: Crypto.randomUUID(),
        status: AccountStatus.ACTIVE,
        ...params,
      };
      await database.insert(accounts).values(values);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
