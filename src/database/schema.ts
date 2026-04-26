import {
  AnySQLiteColumn,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

const date = () => new Date().toISOString();

export const users = sqliteTable("users", {
  id: text({ length: 36 }).primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  createdAt: text().notNull().$default(date),
});

export const accounts = sqliteTable("accounts", {
  id: text({ length: 36 }).primaryKey(),
  name: text().notNull(),
  type: integer().notNull(),
  bank: text(),
  status: integer().notNull(),
  createdAt: text().notNull().$default(date),
});

export const categories = sqliteTable("categories", {
  id: text({ length: 36 }).primaryKey(),
  name: text().notNull(),
  type: integer().notNull(),
  createdAt: text().notNull().$default(date),
});

export const transactions = sqliteTable("transactions", {
  id: text({ length: 36 }).primaryKey(),
  accountId: text()
    .notNull()
    .references(() => accounts.id),
  categoryId: text()
    .notNull()
    .references(() => categories.id),
  relatedTxn: text().references((): AnySQLiteColumn => transactions.id),
  amount: integer().notNull(),
  description: text().notNull(),
  fingerprint: text().notNull().unique(),
  note: text(),
  timestamp: text().notNull(),
  createdAt: text().notNull().$default(date),
});

export const statements = sqliteTable("statements", {
  id: text({ length: 36 }).primaryKey(),
  fileName: text().notNull(),
  status: integer().notNull(),
  createdAt: text().notNull().$default(date),
});

export const parsedTxns = sqliteTable("parsed_txns", {
  id: text({ length: 36 }).primaryKey(),
  accountId: text()
    .notNull()
    .references(() => accounts.id),
  categoryId: text().references(() => categories.id),
  statementId: text()
    .notNull()
    .references(() => statements.id),
  amount: integer().notNull(),
  description: text().notNull(),
  note: text(),
  timestamp: text().notNull(),
  status: integer().notNull(),
  createdAt: text().notNull().$default(date),
});

export const invests = sqliteTable("invests", {
  id: text({ length: 36 }).primaryKey(),
  accountId: text()
    .notNull()
    .references(() => accounts.id),
  transactionId: text()
    .notNull()
    .references(() => transactions.id),
  maturityAmount: integer().notNull(),
  maturityDate: text().notNull(),
  createdAt: text().notNull().$default(date),
});

export const loans = sqliteTable("loans", {
  id: text({ length: 36 }).primaryKey(),
  accountId: text()
    .notNull()
    .references(() => accounts.id),
  transactionId: text()
    .notNull()
    .references(() => transactions.id),
  createdAt: text().notNull().$default(date),
});

export enum AccountType {
  BANK,
  CASH,
  INVEST,
  LOANS,
  WALLET,
}

export enum AccountStatus {
  ACTIVE,
  CLOSED,
}

export enum CategoryType {
  EXPENSE,
  INCOME,
  SYSTEM,
}

export enum StatementStatus {
  COMPLETED,
  PARSED,
}

export enum ParsedTxnStatus {
  APPROVED,
  DUPLICATE,
  ORIGINAL,
  REJECTED,
}
