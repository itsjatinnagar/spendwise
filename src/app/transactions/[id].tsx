import { useCategories } from "@/hooks/use-category";
import { useTransaction } from "@/hooks/use-transaction";
import { useWallets } from "@/hooks/use-wallet";
import { TransactionType } from "@/models/transaction";
import { useNativeTheme } from "@/utils/theme";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const { data: transaction, isLoading: isL1 } = useTransaction(id as string);
  const { data: categories, isLoading: isL2 } = useCategories();
  const { data: wallets, isLoading: isL3 } = useWallets();
  const { colors, fonts } = useNativeTheme();

  let backgroundColor,
    color,
    icon: "arrow-up-right" | "arrow-down-left" | "rotate-ccw" | "minus";

  if (isL1 || isL2 || isL3) return;

  if (
    transaction === null ||
    transaction === undefined ||
    categories === null ||
    categories === undefined ||
    wallets === null ||
    wallets === undefined
  )
    return Alert.alert("Error", "Undefined Data: Transaction ID Screen");

  const category = categories.find((val) => val.id === transaction.categoryId)!;
  const wallet = wallets.find((val) => val.id === transaction.walletId)!;

  switch (transaction.type) {
    case TransactionType.EXPENSE:
      backgroundColor = colors.danger;
      color = colors.dangerText;
      icon = "arrow-up-right";
      break;
    case TransactionType.INCOME:
      backgroundColor = colors.success;
      color = colors.successText;
      icon = "arrow-down-left";
      break;
    case TransactionType.REFUND:
      backgroundColor = colors.refund;
      color = colors.refundText;
      icon = "rotate-ccw";
      break;
    default:
      icon = "minus";
      break;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ gap: 6, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 32,
              width: 32,
              borderRadius: 32,
              backgroundColor: color,
            }}
          >
            <Feather name={icon} size={20} color={backgroundColor} />
          </View>
          <Text style={[fonts.headline, { color: color }]}>
            {formatAmount(transaction.amount)}
          </Text>
        </View>

        <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
          <View style={{ gap: 6 }}>
            <Text style={{ color: colors.placeholder }}>CATEGORY</Text>
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {category.name}
            </Text>
          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: "#f3f4f6" }} />
          <View style={{ gap: 6 }}>
            <Text style={{ color: colors.placeholder }}>WALLET</Text>
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {wallet.name}
            </Text>
          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: "#f3f4f6" }} />
          <View style={{ gap: 6 }}>
            <Text style={{ color: colors.placeholder }}>NOTE</Text>
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {transaction.note}
            </Text>
          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: "#f3f4f6" }} />
          <View style={{ gap: 6 }}>
            <Text style={{ color: colors.placeholder }}>CREATED</Text>
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {formatDate(transaction.timestamp)}
            </Text>
          </View>
        </View>
      </View>
      {transaction.type !== TransactionType.REFUND && (
        <Link href={`/transactions/refund?txnId=${transaction.id}`}>
          <View style={[styles.primary, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="rotate-left" size={20} color={colors.text} />
            <Text style={[styles.label, { color: colors.text }]}>
              Create Refund
            </Text>
          </View>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    gap: 10,
    flexDirection: "row",
  },
  primary: {
    gap: 5,
    flex: 1,
    height: 48,
    width: "100%",
    borderRadius: 48,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
  },
  delete: {
    height: 48,
    width: 48,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    gap: 10,
    padding: 20,
    marginTop: 20,
    borderRadius: 20,
  },
});

function formatAmount(amount: string) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
  }).format(Number(amount));
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour12: false,
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
