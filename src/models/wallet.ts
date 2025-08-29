export type Wallet = {
  id: string;
  name: string;
  startBalance: number;
  currentBalance: number;
  createdAt: Date;
};

export type WalletRow = {
  id: string;
  name: string;
  start_balance: number;
  current_balance: number;
  created_at: string;
};
