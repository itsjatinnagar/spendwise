export type Transaction = {
  id: string;
  walletId: string;
  categoryId: string;
  relatedTxn?: string;
  type: string;
  amount: number;
  timestamp: Date;
  note?: string;
};

export type TransactionRow = {
  id: string;
  wallet_id: string;
  category_id: string;
  related_txn?: string;
  type: string;
  amount: number;
  timestamp: string;
  note?: string;
};
