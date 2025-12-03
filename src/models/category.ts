export enum CategoryType {
  EXPENSE = 1,
  INCOME = 2,
}

export type CategoryRow = {
  id: string;
  name: string;
  type: number;
  parent_id: string | null;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  type: CategoryType;
  parentId: string | null;
  createdAt: Date;
};
