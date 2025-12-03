export type TransferRow = {
  id: string;
  from_wallet: string;
  to_wallet: string;
  amount: string;
  timestamp: string;
  created_at: string;
};

export type Transfer = {
  id: string;
  fromWallet: string;
  toWallet: string;
  amount: string;
  timestamp: Date;
  createdAt: Date;
};
