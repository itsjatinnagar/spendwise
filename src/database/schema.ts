import {
  AnySQLiteColumn,
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text().primaryKey(),
  fullName: text().notNull(),
  email: text().notNull(),
  currency: text().notNull(),
  createdAt: text().notNull(),
});

export const wallets = sqliteTable("wallets", {
  id: text().primaryKey(),
  name: text().notNull(),
  type: integer().notNull(),
  initialBalance: real().notNull(),
  currentBalance: real().notNull(),
  createdAt: text().notNull(),
});

export const categories = sqliteTable("categories", {
  id: text().primaryKey(),
  name: text().notNull(),
  type: integer().notNull(),
  parentId: text().references((): AnySQLiteColumn => categories.id, {
    onDelete: "set null",
  }),
  createdAt: text().notNull(),
});

export const transactions = sqliteTable("transactions", {
  id: text().notNull(),
  walletId: text()
    .notNull()
    .references(() => wallets.id, { onDelete: "restrict" }),
  categoryId: text()
    .notNull()
    .references(() => categories.id, { onDelete: "set null" }),
  type: integer().notNull(),
  amount: real().notNull(),
  note: text(),
  timestamp: text().notNull(),
  relatedTxn: text().references((): AnySQLiteColumn => transactions.id, {
    onDelete: "set null",
  }),
  createdAt: text().notNull(),
});

export const transfers = sqliteTable("transfers", {
  id: text().primaryKey(),
  fromWallet: text()
    .notNull()
    .references(() => wallets.id, { onDelete: "restrict" }),
  toWallet: text()
    .notNull()
    .references(() => wallets.id, { onDelete: "restrict" }),
  amount: real().notNull(),
  timestamp: text().notNull(),
  createdAt: text().notNull(),
});

export const budgets = sqliteTable("budgets", {
  id: text().primaryKey(),
  categoryId: text()
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  amount: real().notNull(),
  year: text().notNull(),
  month: text().notNull(),
  createdAt: text().notNull(),
});

export const loans = sqliteTable("loans", {
  id: text().primaryKey(),
  person: text().notNull(),
  type: integer().notNull(),
  repaid: real().notNull(),
  status: integer().notNull(),
  note: text(),
  transactionId: text()
    .notNull()
    .references(() => transactions.id, { onDelete: "restrict" }),
  createdAt: text().notNull(),
});
