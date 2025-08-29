import { Wallet, WalletRow } from "@/models/wallet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

const toJson = (entity: Wallet): WalletRow => ({
  id: entity.id,
  name: entity.name,
  start_balance: entity.startBalance,
  current_balance: entity.currentBalance,
  created_at: entity.createdAt.toISOString(),
});

const fromJson = (row: WalletRow): Wallet => ({
  id: row.id,
  name: row.name,
  startBalance: row.start_balance,
  currentBalance: row.current_balance,
  createdAt: new Date(row.created_at),
});

export const useWallets = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const rows = await db.getAllAsync<WalletRow>("SELECT * FROM wallets");
      return rows.map((row) => fromJson(row));
    },
  });
};

export const useCreateWallet = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (wallet: Wallet) => {
      const request = toJson(wallet);
      await db.runAsync(
        `INSERT INTO wallets (id,name,start_balance,current_balance,created_at) VALUES (?,?,?,?,?)`,
        [
          request.id,
          request.name,
          request.start_balance,
          request.current_balance,
          request.created_at,
        ]
      );
    },
    onSuccess: () => {
      console.log("{useCreateWallet}: onSuccess Inside Hook");
      client.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
};
