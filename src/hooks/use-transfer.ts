import { Transfer, TransferRow } from "@/models/transfer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

const toJson = (entity: Transfer): TransferRow => ({
  amount: entity.amount,
  created_at: entity.createdAt.toISOString(),
  from_wallet: entity.fromWallet,
  id: entity.id,
  timestamp: entity.timestamp.toISOString(),
  to_wallet: entity.toWallet,
});

const fromJson = (row: TransferRow): Transfer => ({
  amount: row.amount,
  createdAt: new Date(row.created_at),
  fromWallet: row.from_wallet,
  id: row.id,
  timestamp: new Date(row.timestamp),
  toWallet: row.to_wallet,
});

export const useTransfers = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["transfers"],
    queryFn: async () => {
      const query = "SELECT * FROM transfers";
      const rows = await db.getAllAsync<TransferRow>(query);
      return rows.map((r) => fromJson(r));
    },
  });
};

export const useCreateTransfer = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (transfer: Transfer) => {
      const request = toJson(transfer);
      const keys = Object.keys(request);
      const columns = `(${keys.join(", ")})`;
      const params = `(${keys.map(() => "?").join(", ")})`;

      const query = `INSERT INTO transfers ${columns} VALUES ${params}`;
      const values = keys.map((key) => request[key as keyof TransferRow]);
      await db.runAsync(query, values);

      await db.runAsync(
        `UPDATE wallets SET current_balance = current_balance - ? WHERE id = ?`,
        [request.amount, request.from_wallet]
      );
      await db.runAsync(
        `UPDATE wallets SET current_balance = current_balance + ? WHERE id = ?`,
        [request.amount, request.to_wallet]
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["transfers"] });
    },
  });
};
