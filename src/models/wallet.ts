export enum WalletType {
  CASH = 1,
  CARD = 2,
}

export type WalletRow = {
  id: string;
  name: string;
  type: number;
  initial_balance: string;
  current_balance: string;
  created_at: string;
};

export type Wallet = {
  id: string;
  name: string;
  type: WalletType;
  initialBalance: string;
  currentBalance: string;
  createdAt: Date;
};
