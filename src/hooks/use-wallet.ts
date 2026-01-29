import { database } from "@/database";
import { wallets } from "@/database/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWallets = () => {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      return await database.select().from(wallets);
    },
  });
};

export const useCreateWallet = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (wallet: typeof wallets.$inferInsert) => {
      await database.insert(wallets).values(wallet);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
};
