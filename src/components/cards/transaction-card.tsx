import { accounts, categories, transactions } from "@/database/schema";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../common/text";
import { formatAmount, formatDate } from "@/utilities/lib";
import { ArrowDownLeft } from "../icons/arrow-down-left";
import { ArrowUpRight } from "../icons/arrow-up-right";
import { Link } from "expo-router";

type Props = {
  transaction: typeof transactions.$inferSelect & {
    account: typeof accounts.$inferSelect.name;
    category: typeof categories.$inferSelect.name;
  };
};

export default function TransactionCard({ transaction }: Props) {
  const color = transaction.amount > 0 ? "#1AA44A" : "#E7000B";

  return (
    <Link href={`/transactions/${transaction.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.icon}>
            {transaction.amount > 0 ? (
              <ArrowDownLeft color={color} />
            ) : (
              <ArrowUpRight color={color} />
            )}
          </View>
          <View style={{ gap: 4, flex: 1 }}>
            <Text style={{ fontWeight: "600" }}>{transaction.category}</Text>
            {transaction.note && (
              <Text.Caption>{transaction.note}</Text.Caption>
            )}
            <Text.Caption style={{ color: "#55595F", marginTop: 4 }}>
              {formatDate(transaction.timestamp)}
            </Text.Caption>
          </View>
          <View style={{ gap: 4, alignItems: "flex-end" }}>
            <Text style={{ color, fontWeight: "600" }}>
              {formatAmount(transaction.amount)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFF7E0",
  },
  wrapper: {
    gap: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
