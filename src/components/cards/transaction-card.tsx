import { accounts, categories, transactions } from "@/database/schema";
import { SymbolView } from "expo-symbols";
import { StyleSheet, View } from "react-native";
import Text from "../common/text";
import { formatAmount, formatDate } from "@/utilities/lib";

type Props = {
  transaction: typeof transactions.$inferSelect & {
    account: typeof accounts.$inferSelect.name;
    category: typeof categories.$inferSelect.name;
  };
};

export default function TransactionCard({ transaction }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.icon}>
          <SymbolView name={{ android: "call_made" }} />
        </View>
        <View style={{ gap: 4, flex: 1 }}>
          <Text.Label>{transaction.category}</Text.Label>
          <Text.Caption>{formatDate(transaction.timestamp)}</Text.Caption>
        </View>
        <View style={{ gap: 4, alignItems: "flex-end" }}>
          <Text.Label>{formatAmount(transaction.amount)}</Text.Label>
        </View>
      </View>
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
  wrapper: {
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
