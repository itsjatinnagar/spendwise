import { useMonthlyStatistics } from "@/hooks/use-statistics";
import { TransactionType } from "@/models/transaction";
import { useNativeTheme } from "@/utils/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data: statistics, isLoading: isL1 } = useMonthlyStatistics(
    new Date(),
  );
  const { colors, fonts } = useNativeTheme();

  if (isL1) return;

  if (statistics === undefined)
    return Alert.alert("Error", "Undefined Data: Statistics Screen");

  const income = statistics
    .filter((val) => val.type === TransactionType.INCOME)
    .reduce((prev, current) => prev + current.amount, 0);
  const expense = statistics
    .filter((val) => val.type === TransactionType.EXPENSE)
    .reduce((prev, current) => prev + current.amount, 0);

  const renderCategoryCard = ({
    item,
  }: {
    item: (typeof statistics)[number];
  }) => {
    const color =
      item.type === TransactionType.INCOME
        ? colors.successText
        : colors.dangerText;
    const icon =
      item.type === TransactionType.INCOME ? "trending-up" : "trending-down";

    return (
      <View style={[styles.tile, { backgroundColor: colors.background }]}>
        <Text style={[styles.name, { color: colors.text }]}>
          {item.category}
        </Text>
        <View style={styles.row}>
          <View style={styles.item}>
            <MaterialIcons name={icon} size={16} color={color} />
            <Text style={[styles.text, { color }]}>
              {formatAmount(item.amount)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.container}>
      <Text style={fonts.title}>Statistics</Text>

      <View style={styles.wrapper}>
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <MaterialIcons
            name="trending-up"
            size={24}
            color={colors.successText}
          />
          <Text style={[styles.label, { color: colors.successText }]}>
            Total Income
          </Text>
          <Text style={[styles.amount, { color: colors.successText }]}>
            {formatAmount(income)}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <MaterialIcons
            name="trending-down"
            size={24}
            color={colors.dangerText}
          />
          <Text style={[styles.label, { color: colors.dangerText }]}>
            Total Expense
          </Text>
          <Text style={[styles.amount, { color: colors.dangerText }]}>
            {formatAmount(expense)}
          </Text>
        </View>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>
        Category Breakdown
      </Text>

      <FlatList
        data={statistics}
        renderItem={renderCategoryCard}
        keyExtractor={(item) => item.id}
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
  wrapper: {
    gap: 10,
    flexDirection: "row",
  },
  card: {
    gap: 8,
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
  },
  amount: {
    fontSize: 16,
    fontWeight: 700,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  tile: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 500,
  },
  row: {
    gap: 10,
    flexDirection: "row",
  },
  item: {
    gap: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
    fontWeight: 600,
  },
});

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};
