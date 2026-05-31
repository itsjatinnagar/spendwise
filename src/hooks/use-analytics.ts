import { database } from "@/database";
import {
  accounts,
  categories,
  CategoryType,
  transactions,
} from "@/database/schema";
import { useQuery } from "@tanstack/react-query";
import { and, desc, eq, gte, lt, sql, sum } from "drizzle-orm";

export type CategoryBreakdownItem = {
  categoryId: string;
  categoryName: string;
  total: number;
  percentage: number;
};

export type DailyPattern = {
  day: string; // "Mon", "Tue", etc.
  expense: number;
  income: number;
};

export type TopTransaction = {
  id: string;
  amount: number;
  description: string;
  timestamp: string;
  account: string;
  category: string;
};

export type AnalyticsData = {
  income: number;
  expense: number;
  savings: number;
  savingsRate: number;
  expenseCategoryBreakdown: CategoryBreakdownItem[];
  incomeCategoryBreakdown: CategoryBreakdownItem[];
  dailyPattern: DailyPattern[];
  prevMonthIncome: number;
  prevMonthExpense: number;
  topExpenses: TopTransaction[];
};

const getMonthBounds = (year: number, month: number) => {
  const start = new Date(year, month, 1).toISOString();
  const end = new Date(year, month + 1, 1).toISOString();
  return { start, end };
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const useAnalytics = (year: number, month: number) =>
  useQuery({
    queryKey: ["analytics", year, month],
    queryFn: async (): Promise<AnalyticsData> => {
      const { start, end } = getMonthBounds(year, month);

      // Previous month bounds
      const prevDate = new Date(year, month - 1, 1);
      const { start: prevStart, end: prevEnd } = getMonthBounds(
        prevDate.getFullYear(),
        prevDate.getMonth(),
      );

      const monthFilter = and(
        gte(transactions.timestamp, start),
        lt(transactions.timestamp, end),
      );

      const prevMonthFilter = and(
        gte(transactions.timestamp, prevStart),
        lt(transactions.timestamp, prevEnd),
      );

      // ── Current month totals ──────────────────────────────────────────────
      const [totals] = await database
        .select({
          income: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.amount} > 0 THEN ${transactions.amount} ELSE 0 END), 0)`,
          expense: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount} ELSE 0 END), 0)`,
        })
        .from(transactions)
        .where(monthFilter);

      // ── Previous month totals ─────────────────────────────────────────────
      const [prevTotals] = await database
        .select({
          income: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.amount} > 0 THEN ${transactions.amount} ELSE 0 END), 0)`,
          expense: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount} ELSE 0 END), 0)`,
        })
        .from(transactions)
        .where(prevMonthFilter);

      // ── Expense category breakdown ────────────────────────────────────────
      const expenseCatRaw = await database
        .select({
          categoryId: categories.id,
          categoryName: categories.name,
          total: sql<number>`ABS(${sum(transactions.amount)})`,
        })
        .from(transactions)
        .innerJoin(categories, eq(categories.id, transactions.categoryId))
        .where(
          and(
            monthFilter,
            lt(transactions.amount, 0),
            eq(categories.type, CategoryType.EXPENSE),
          ),
        )
        .groupBy(categories.id, categories.name)
        .orderBy(desc(sql`ABS(${sum(transactions.amount)})`));

      // ── Income category breakdown ─────────────────────────────────────────
      const incomeCatRaw = await database
        .select({
          categoryId: categories.id,
          categoryName: categories.name,
          total: sql<number>`${sum(transactions.amount)}`,
        })
        .from(transactions)
        .innerJoin(categories, eq(categories.id, transactions.categoryId))
        .where(
          and(
            monthFilter,
            gte(transactions.amount, 0),
            eq(categories.type, CategoryType.INCOME),
          ),
        )
        .groupBy(categories.id, categories.name)
        .orderBy(desc(sql`${sum(transactions.amount)}`));

      // ── Daily spending pattern (day of week) ──────────────────────────────
      const dailyRaw = await database
        .select({
          dayOfWeek: sql<number>`CAST(strftime('%w', ${transactions.timestamp}) AS INTEGER)`,
          expense: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.amount} < 0 THEN ABS(${transactions.amount}) ELSE 0 END), 0)`,
          income: sql<number>`COALESCE(SUM(CASE WHEN ${transactions.amount} > 0 THEN ${transactions.amount} ELSE 0 END), 0)`,
        })
        .from(transactions)
        .where(monthFilter)
        .groupBy(sql`strftime('%w', ${transactions.timestamp})`);

      const dailyMap: Record<number, { expense: number; income: number }> = {};
      for (const row of dailyRaw) {
        dailyMap[row.dayOfWeek] = {
          expense: row.expense,
          income: row.income,
        };
      }

      const dailyPattern: DailyPattern[] = DAY_NAMES.map((day, idx) => ({
        day,
        expense: dailyMap[idx]?.expense ?? 0,
        income: dailyMap[idx]?.income ?? 0,
      }));

      // ── Top 5 expenses ────────────────────────────────────────────────────
      const topExpenses = await database
        .select({
          id: transactions.id,
          amount: transactions.amount,
          description: transactions.description,
          timestamp: transactions.timestamp,
          account: accounts.name,
          category: categories.name,
        })
        .from(transactions)
        .innerJoin(accounts, eq(accounts.id, transactions.accountId))
        .innerJoin(categories, eq(categories.id, transactions.categoryId))
        .where(and(monthFilter, lt(transactions.amount, 0)))
        .orderBy(transactions.amount)
        .limit(5);

      const income = totals?.income ?? 0;
      const expense = Math.abs(totals?.expense ?? 0);
      const savings = income - expense;
      const savingsRate = income > 0 ? (savings / income) * 100 : 0;

      const totalExpense = expenseCatRaw.reduce((s, c) => s + c.total, 0);
      const totalIncome = incomeCatRaw.reduce((s, c) => s + c.total, 0);

      return {
        income,
        expense,
        savings,
        savingsRate,
        expenseCategoryBreakdown: expenseCatRaw.map((c) => ({
          ...c,
          percentage: totalExpense > 0 ? (c.total / totalExpense) * 100 : 0,
        })),
        incomeCategoryBreakdown: incomeCatRaw.map((c) => ({
          ...c,
          percentage: totalIncome > 0 ? (c.total / totalIncome) * 100 : 0,
        })),
        dailyPattern,
        prevMonthIncome: prevTotals?.income ?? 0,
        prevMonthExpense: Math.abs(prevTotals?.expense ?? 0),
        topExpenses,
      };
    },
  });
