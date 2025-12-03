export enum TransactionType {
  EXPENSE = 1,
  INCOME = 2,
  REFUND = 3,
}

export type TransactionRow = {
  id: string;
  wallet_id: string;
  category_id: string;
  type: number;
  amount: string;
  note: string | null;
  timestamp: string;
  related_txn: string | null;
  created_at: string;
};

export type Transaction = {
  id: string;
  walletId: string;
  categoryId: string;
  type: TransactionType;
  amount: string;
  note: string | null;
  timestamp: Date;
  relatedTxn: string | null;
  createdAt: Date;
};
