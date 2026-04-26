import { accounts } from "@/database/schema";
import { StyleSheet, View } from "react-native";
import Text from "../common/text";
import { accountTypeLabel, formatAmount } from "@/utilities/lib";

type Props = {
  account: typeof accounts.$inferSelect;
  balance?: number;
};

export default function AccountCard({ account, balance = 0 }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text.Label>{account.name}</Text.Label>
        <View style={styles.badge}>
          <Text.Caption>{accountTypeLabel(account.type)}</Text.Caption>
        </View>
      </View>
      {account.bank && <Text.Caption>{account.bank}</Text.Caption>}
      <Text.Label style={{ fontSize: 20 }}>{formatAmount(balance)}</Text.Label>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFF7E0",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: {
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: "#FFBA00",
  },
});
