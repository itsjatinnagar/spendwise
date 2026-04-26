import {
  AccountType,
  ParsedTxnStatus,
  StatementStatus,
} from "@/database/schema";

export const accountTypeLabel = (type: AccountType) => {
  switch (type) {
    case AccountType.BANK:
      return "Bank";
    case AccountType.CASH:
      return "Cash";
    case AccountType.INVEST:
      return "Investment";
    case AccountType.LOANS:
      return "Loan";
    case AccountType.WALLET:
      return "Wallet";
  }
};

export const parsedTxnStatusLabel = (status: ParsedTxnStatus) => {
  switch (status) {
    case ParsedTxnStatus.APPROVED:
      return "Approved";
    case ParsedTxnStatus.DUPLICATE:
      return "Duplicate";
    case ParsedTxnStatus.ORIGINAL:
      return "Original";
    case ParsedTxnStatus.REJECTED:
      return "Rejected";
  }
};

export const statementStatusLabel = (status: StatementStatus) => {
  switch (status) {
    case StatementStatus.COMPLETED:
      return "Completed";
    case StatementStatus.PARSED:
      return "Parsed";
  }
};

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount / 100);
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};
