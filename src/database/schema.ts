import {
  AnySQLiteColumn,
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const users = sqliteTable("users", {
  id: text({ length: 36 }).primaryKey().$default(uuid),
  name: text().notNull(),
  email: text().notNull(),
  currency: text().notNull(),
  createdAt: text().notNull().$default(Date),
});

export const accounts = sqliteTable("accounts", {
  id: text({ length: 36 }).primaryKey().$default(uuid),
  name: text().notNull(),
  type: integer().notNull(),
  currency: text().notNull(),
  balance: real().notNull().default(0),
  creditLimit: real(),
  status: integer().notNull(),
  createdAt: text().notNull().$default(Date),
});

export const categories = sqliteTable("categories", {
  id: text({ length: 36 }).primaryKey().$default(uuid),
  name: text().notNull(),
  type: integer().notNull(),
  icon: text(),
  color: text().notNull(),
  createdAt: text().notNull().$default(Date),
});

export const transactions = sqliteTable("transactions", {
  id: text({ length: 36 }).primaryKey().$default(uuid),
  accountId: text()
    .notNull()
    .references(() => accounts.id),
  categoryId: text()
    .notNull()
    .references(() => categories.id),
  type: integer().notNull(),
  amount: real().notNull(),
  description: text().notNull(),
  note: text(),
  timestamp: text().notNull(),
  source: integer().notNull(),
  relatedTxnId: text().references((): AnySQLiteColumn => transactions.id),
  createdAt: text().notNull().$default(Date),
});

export const transfers = sqliteTable("transfers", {
  id: text({ length: 36 }).primaryKey().$default(uuid),
  sourceTxnId: text()
    .notNull()
    .references(() => transactions.id),
  destTxnId: text()
    .notNull()
    .references(() => transactions.id),
  createdAt: text().notNull().$default(Date),
});

export const loans = sqliteTable("loans", {
  id: text({ length: 36 }).primaryKey().$default(uuid),
  name: text().notNull(),
  type: integer().notNull(),
  amount: real().notNull(),
  repaid: real().notNull().default(0),
  status: integer().notNull(),
  createdAt: text().notNull().$default(Date),
});

export const loanTxns = sqliteTable("loan_txns", {
  loanId: text()
    .notNull()
    .references(() => loans.id),
  txnId: text()
    .notNull()
    .references(() => transactions.id),
  createdAt: text().notNull().$default(Date),
});

export const investTxns = sqliteTable("invest_txns", {
  type: integer().notNull(),
  txnId: text()
    .notNull()
    .references(() => transactions.id),
  accountId: text()
    .notNull()
    .references(() => accounts.id),
});

export const importSessions = sqliteTable("import_sessions", {
  id: text({ length: 36 }).primaryKey().$default(uuid),
  fileName: text().notNull(),
  status: integer().notNull(),
  createdAt: text().notNull().$default(Date),
});

export const parsedTxns = sqliteTable("parsed_txns", {
  id: text({ length: 36 }).primaryKey().$default(uuid),
  sessionId: text()
    .notNull()
    .references(() => importSessions.id),
  data: text().notNull(),
  userData: text().notNull(),
  status: integer().notNull(),
  createdAt: text().notNull().$default(Date),
});
