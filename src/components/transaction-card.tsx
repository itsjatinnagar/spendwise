import { Category } from "@/models/category";
import { Transaction, TransactionType } from "@/models/transaction";
import { Wallet } from "@/models/wallet";
import { useNativeTheme } from "@/utils/theme";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  categories: Category[];
  transaction: Transaction;
  wallets: Wallet[];
};
export default function TransactionCard({
  categories,
  transaction,
  wallets,
}: Props) {
  const { colors } = useNativeTheme();

  const category = categories.find(
    (value) => value.id === transaction.categoryId
  )!;

  let backgroundColor,
    color,
    icon: "arrow-down-left" | "arrow-up-right" | "minus";
  switch (transaction.type) {
    case TransactionType.EXPENSE:
      backgroundColor = colors.danger;
      color = colors.dangerText;
      icon = "arrow-down-left";
      break;
    case TransactionType.INCOME:
      backgroundColor = colors.success;
      color = colors.successText;
      icon = "arrow-up-right";
      break;
    default:
      icon = "minus";
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View>
        <View
          style={[
            {
              height: 32,
              width: 32,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            },
            { backgroundColor: backgroundColor },
          ]}
        >
          <Feather name={icon} size={20} color={color} />
        </View>
      </View>

      <View style={{ gap: 4, flex: 1 }}>
        <Text style={[styles.title, { color: color }]}>{category.name}</Text>

        <Text style={{ color: colors.placeholder }}>
          {formatDate(transaction.timestamp)}
        </Text>

        {transaction.note && (
          <Text style={{ marginTop: 6 }}>{transaction.note}</Text>
        )}
      </View>

      <View>
        <Text style={{ color: color }}>{formatAmount(transaction.amount)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
});

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatAmount(amount: string) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
  }).format(Number(amount));
}
