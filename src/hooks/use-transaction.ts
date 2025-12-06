import {
  Transaction,
  TransactionRow,
  TransactionType,
} from "@/models/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

const toJson = (entity: Transaction): TransactionRow => ({
  amount: entity.amount,
  category_id: entity.categoryId,
  created_at: entity.createdAt.toISOString(),
  id: entity.id,
  note: entity.note,
  related_txn: entity.relatedTxn,
  timestamp: entity.timestamp.toISOString(),
  type: entity.type,
  wallet_id: entity.walletId,
});

const fromJson = (row: TransactionRow): Transaction => ({
  amount: row.amount,
  categoryId: row.category_id,
  createdAt: new Date(row.created_at),
  id: row.id,
  note: row.note,
  relatedTxn: row.related_txn,
  timestamp: new Date(row.timestamp),
  type: row.type,
  walletId: row.wallet_id,
});

export const useTransactions = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const query = "SELECT * FROM transactions ORDER BY created_at DESC";
      const rows = await db.getAllAsync<TransactionRow>(query);
      return rows.map((row) => fromJson(row));
    },
  });
};

export const useRecentTransactions = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["transactions", "recents"],
    queryFn: async () => {
      const query =
        "SELECT * FROM transactions ORDER BY timestamp DESC LIMIT 4";
      const rows = await db.getAllAsync<TransactionRow>(query);
      return rows.map((row) => fromJson(row));
    },
  });
};

export const useTransaction = (id: Transaction["id"]) => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: async () => {
      const query = "SELECT * FROM transactions WHERE id = ?";
      const values = [id];
      const row = await db.getFirstAsync<TransactionRow>(query, values);
      return row ? fromJson(row) : null;
    },
  });
};

export const useCreateTransaction = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (transaction: Transaction) => {
      const request = toJson(transaction);
      const keys = Object.keys(request);
      const columns = `(${keys.join(", ")})`;
      const params = `(${keys.map(() => "?").join(", ")})`;

      const query = `INSERT INTO transactions ${columns} VALUES ${params}`;
      const values = keys.map((key) => request[key as keyof TransactionRow]);
      await db.runAsync(query, values);

      await db.runAsync(
        `UPDATE wallets SET current_balance = current_balance ${
          transaction.type === TransactionType.EXPENSE ? "-" : "+"
        } ? WHERE id = ?`,
        [transaction.amount, transaction.walletId]
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
