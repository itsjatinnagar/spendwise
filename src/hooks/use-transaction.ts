import { Transaction, TransactionRow } from "@/models/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

const toJson = (entity: Transaction): TransactionRow => ({
  id: entity.id,
  wallet_id: entity.walletId,
  category_id: entity.categoryId,
  related_txn: entity.relatedTxn,
  type: entity.type,
  amount: entity.amount,
  timestamp: entity.timestamp.toISOString(),
  note: entity.note,
});

const fromJson = (row: TransactionRow): Transaction => ({
  id: row.id,
  walletId: row.wallet_id,
  categoryId: row.category_id,
  relatedTxn: row.related_txn,
  type: row.type,
  amount: row.amount,
  timestamp: new Date(row.timestamp),
  note: row.note,
});

export const useTransactions = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const rows = await db.getAllAsync<TransactionRow>(
        "SELECT * FROM transactions ORDER BY timestamp DESC"
      );
      return rows.map((row) => fromJson(row));
    },
  });
};

export const useCreateTransaction = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (transaction: Transaction) => {
      const request = toJson(transaction);
      await db.runAsync(
        `INSERT INTO transactions (id,wallet_id,category_id,related_txn,type,amount,timestamp,note) VALUES (?,?,?,?,?,?,?,?)`,
        [
          request.id,
          request.wallet_id,
          request.category_id,
          request.related_txn ?? null,
          request.type,
          request.amount,
          request.timestamp,
          request.note ?? null,
        ]
      );
      await db.runAsync(
        `UPDATE wallets SET current_balance = current_balance ${
          transaction.type === "income" ? "+" : "-"
        } ? WHERE id = ?`,
        [transaction.amount, transaction.walletId]
      );
    },
    onSuccess: () => {
      console.log("{useCreateTransaction}: onSuccess Inside Hook");
      client.invalidateQueries({ queryKey: ["transactions"] });
      client.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
};
