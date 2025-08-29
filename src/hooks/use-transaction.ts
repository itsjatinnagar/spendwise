import { Transaction, TransactionRow } from "@/models/transaction";
import { useMutation, useQuery } from "@tanstack/react-query";
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
        "SELECT * FROM transactions"
      );
      return rows.map((row) => fromJson(row));
    },
  });
};

export const useCreateTransaction = () => {
  const db = useSQLiteContext();
  return useMutation({
    mutationFn: async () => {},
  });
};
