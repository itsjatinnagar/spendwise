export type LoanRow = {
  id: string;
  person: string;
  type: number;
  repaid: string;
  status: number;
  note: string | null;
  transaction_id: string;
  created_at: string;
};

export type Loan = {
  id: string;
  person: string;
  type: number;
  repaid: string;
  status: number;
  note: string | null;
  transactionId: string;
  createdAt: Date;
};
