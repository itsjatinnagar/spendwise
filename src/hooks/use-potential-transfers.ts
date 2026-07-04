import { database } from "@/database";
import { accounts, transactions } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";
import { and, eq, getTableColumns, isNull, sql } from "drizzle-orm";

export type TransferCandidate = {
  creditId: string;
  creditAccountId: string;
  creditAccount: string;
  creditCategoryId: string;
  creditAmount: number;
  creditDescription: string;
  creditTimestamp: string;
  creditFingerprint: string;
  creditNote: string | null;
  debitId: string;
  debitAccountId: string;
  debitAccount: string;
  debitCategoryId: string;
  debitAmount: number;
  debitDescription: string;
  debitTimestamp: string;
  debitFingerprint: string;
  debitNote: string | null;
};

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export const usePotentialTransfers = () =>
  useQuery({
    queryKey: ["potential-transfers"],
    queryFn: async (): Promise<TransferCandidate[]> => {
      // Fetch all unlinked credits and debits separately, then pair in JS.
      // This avoids complex Drizzle self-join typing while keeping the logic
      // clean and readable.
      const creditRows = await database
        .select({
          ...getTableColumns(transactions),
          accountName: accounts.name,
        })
        .from(transactions)
        .innerJoin(accounts, eq(accounts.id, transactions.accountId))
        .where(
          and(
            isNull(transactions.relatedTxn),
            sql`${transactions.amount} > 0`,
          ),
        );

      const debitRows = await database
        .select({
          ...getTableColumns(transactions),
          accountName: accounts.name,
        })
        .from(transactions)
        .innerJoin(accounts, eq(accounts.id, transactions.accountId))
        .where(
          and(
            isNull(transactions.relatedTxn),
            sql`${transactions.amount} < 0`,
          ),
        );

      const candidates: TransferCandidate[] = [];
      const usedCreditIds = new Set<string>();
      const usedDebitIds = new Set<string>();

      for (const credit of creditRows) {
        for (const debit of debitRows) {
          if (usedCreditIds.has(credit.id)) break;
          if (usedDebitIds.has(debit.id)) continue;

          // Same absolute amount
          if (credit.amount !== Math.abs(debit.amount)) continue;

          // Must be on different accounts
          if (credit.accountId === debit.accountId) continue;

          // Within 3-day window
          const diff = Math.abs(
            new Date(credit.timestamp).getTime() -
              new Date(debit.timestamp).getTime(),
          );
          if (diff > THREE_DAYS_MS) continue;

          candidates.push({
            creditId: credit.id,
            creditAccountId: credit.accountId,
            creditAccount: credit.accountName,
            creditCategoryId: credit.categoryId,
            creditAmount: credit.amount,
            creditDescription: credit.description,
            creditTimestamp: credit.timestamp,
            creditFingerprint: credit.fingerprint,
            creditNote: credit.note,
            debitId: debit.id,
            debitAccountId: debit.accountId,
            debitAccount: debit.accountName,
            debitCategoryId: debit.categoryId,
            debitAmount: debit.amount,
            debitDescription: debit.description,
            debitTimestamp: debit.timestamp,
            debitFingerprint: debit.fingerprint,
            debitNote: debit.note,
          });

          usedCreditIds.add(credit.id);
          usedDebitIds.add(debit.id);
        }
      }

      return candidates;
    },
  });
