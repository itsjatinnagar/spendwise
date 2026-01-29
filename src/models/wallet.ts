import { wallets } from "@/database/schema";

export enum WalletType {
  CASH = 1,
  CARD = 2,
}

export type Wallet = typeof wallets.$inferSelect;
