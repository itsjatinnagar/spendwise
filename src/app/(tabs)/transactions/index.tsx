import TransactionCard from "@/components/transaction-card";
import { useCategories } from "@/hooks/use-category";
import { useTransactions } from "@/hooks/use-transaction";
import { useWallets } from "@/hooks/use-wallet";
import { useNativeTheme } from "@/utils/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data: transactions, isLoading: isL1 } = useTransactions();
  const { data: categories, isLoading: isL2 } = useCategories();
  const { data: wallets, isLoading: isL3 } = useWallets();
  const { colors, fonts } = useNativeTheme();

  if (isL1 || isL2 || isL3) return;

  if (
    transactions === null ||
    transactions === undefined ||
    categories === null ||
    categories === undefined ||
    wallets === null ||
    wallets === undefined
  )
    return Alert.alert("Error", "Undefined Data: My Transactions Screen");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={fonts.title}>My Transactions</Text>

        <Link href="/transactions/modal">
          <View style={[styles.action, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="add" size={20} color={colors.foreground} />
          </View>
        </Link>
      </View>

      <FlatList
        data={transactions}
        style={{ marginTop: 20 }}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TransactionCard
            categories={categories}
            transaction={item}
            wallets={wallets}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  action: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
});
