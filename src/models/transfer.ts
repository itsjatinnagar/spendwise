export type Transfer = {
  id: string;
  fromWallet: string;
  toWallet: string;
  amount: number;
  createdAt: Date;
};

export type TransferRow = {
  id: string;
  from_wallet: string;
  to_wallet: string;
  amount: number;
  created_at: string;
};
