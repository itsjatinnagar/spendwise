import { useCategories } from "@/hooks/use-category";
import { useTransactions } from "@/hooks/use-transaction";
import { CategoryType } from "@/models/category";
import { TransactionType } from "@/models/transaction";
import { useNativeTheme } from "@/utils/theme";
import { Feather } from "@expo/vector-icons";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data: transactions, isLoading: isL1 } = useTransactions();
  const { data: categories, isLoading: isL2 } = useCategories();
  const { colors, fonts } = useNativeTheme();

  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  if (isL1 || isL2) return;

  if (transactions === undefined || categories === undefined)
    return Alert.alert("Error", "Undefined Data: Statistics Screen");

  const monthlyTransactions = transactions.filter(
    (txn) => new Date(txn.timestamp) >= startDate && new Date(txn.timestamp) <= endDate
  );

  const expenseCategories = categories.filter(
    (val) => val.type === CategoryType.EXPENSE
  );

  const data = expenseCategories
    .map((val) => ({
      id: val.id,
      name: val.name,
      amount: monthlyTransactions
        .filter((txn) => txn.categoryId === val.id)
        .reduce((prev, curr) => prev + Number(curr.amount), 0),
    }))
    .sort((a, b) => b.amount - a.amount);

  const expense = transactions
    .filter((txn) => txn.type === TransactionType.EXPENSE)
    .reduce((prev, curr) => prev + Number(curr.amount), 0);
  const refund = transactions
    .filter((txn) => txn.type === TransactionType.REFUND)
    .reduce((prev, curr) => prev + Number(curr.amount), 0);
  const income = transactions
    .filter((txn) => txn.type === TransactionType.INCOME)
    .reduce((prev, curr) => prev + Number(curr.amount), 0);

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.container}>
      <Text style={fonts.title}>Statistics</Text>
      <View style={styles.row}>
        <View
          style={[
            {
              flex: 1,
              padding: 10,
              borderRadius: 20,
              alignItems: "center",
              backgroundColor: colors.danger,
            },
          ]}
        >
          <Feather name="arrow-up-right" size={20} color={colors.dangerText} />
          <Text style={{ color: colors.dangerText, fontSize: 16 }}>
            {formatAmount(expense)}
          </Text>
        </View>
        <View
          style={[
            {
              flex: 1,
              padding: 10,
              borderRadius: 20,
              alignItems: "center",
              backgroundColor: colors.refund,
            },
          ]}
        >
          <Feather name="rotate-ccw" size={20} color={colors.refundText} />
          <Text style={{ color: colors.refundText, fontSize: 16 }}>
            {formatAmount(refund)}
          </Text>
        </View>
        <View
          style={[
            {
              flex: 1,
              padding: 10,
              borderRadius: 20,
              alignItems: "center",
              backgroundColor: colors.success,
            },
          ]}
        >
          <Feather
            name="arrow-down-left"
            size={20}
            color={colors.successText}
          />
          <Text style={{ color: colors.successText, fontSize: 16 }}>
            {formatAmount(income)}
          </Text>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: colors.placeholder,
              }}
            >
              {item.name}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              {formatAmount(item.amount)}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
    paddingBottom: 6,
    paddingHorizontal: 20,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    gap: 10,
    flexDirection: "row",
  },
});

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}
