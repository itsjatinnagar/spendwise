import { Wallet, WalletRow } from "@/models/wallet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

const toJson = (entity: Wallet): WalletRow => ({
  created_at: entity.createdAt.toISOString(),
  current_balance: entity.currentBalance,
  id: entity.id,
  initial_balance: entity.initialBalance,
  name: entity.name,
  type: entity.type,
});

const fromJson = (row: WalletRow): Wallet => ({
  createdAt: new Date(row.created_at),
  currentBalance: row.current_balance,
  id: row.id,
  initialBalance: row.initial_balance,
  name: row.name,
  type: row.type,
});

export const useWallets = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const query = "SELECT * FROM wallets";
      const rows = await db.getAllAsync<WalletRow>(query);
      return rows.map((r) => fromJson(r));
    },
  });
};

export const useCreateWallet = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (wallet: Wallet) => {
      const request = toJson(wallet);
      const keys = Object.keys(request);
      const columns = `(${keys.join(", ")})`;
      const params = `(${keys.map(() => "?").join(", ")})`;

      const query = `INSERT INTO wallets ${columns} VALUES ${params}`;
      const values = keys.map((key) => request[key as keyof WalletRow]);
      await db.runAsync(query, values);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
};
