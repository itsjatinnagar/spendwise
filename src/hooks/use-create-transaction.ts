import { database } from "@/database";
import { transactions } from "@/database/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";

type Params = {
  accountId: string;
  categoryId: string;
  amount: number; // in paise (integer)
  description: string;
  note: string | null;
  timestamp: string; // ISO string
};

export const useCreateTransaction = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (params: Params) => {
      const id = Crypto.randomUUID();
      const fingerprint = `${params.amount}|${params.description}|${params.timestamp}`;

      await database.insert(transactions).values({
        id,
        accountId: params.accountId,
        categoryId: params.categoryId,
        amount: params.amount,
        description: params.description,
        note: params.note,
        timestamp: params.timestamp,
        fingerprint,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
