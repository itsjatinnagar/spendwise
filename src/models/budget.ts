export type BudgetRow = {
  id: string;
  category_id: string;
  amount: string;
  year: string;
  month: string;
  created_at: string;
};

export type Budget = {
  id: string;
  categoryId: string;
  amount: string;
  year: string;
  month: string;
  createdAt: Date;
};
