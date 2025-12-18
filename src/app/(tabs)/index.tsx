import TransactionCard from "@/components/transaction-card";
import { useCategories } from "@/hooks/use-category";
import { useRecentTransactions } from "@/hooks/use-transaction";
import { useUser } from "@/hooks/use-user";
import { useWallets } from "@/hooks/use-wallet";
import { useNativeTheme } from "@/utils/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data: user, isLoading: isL1 } = useUser();
  const { data: wallets, isLoading: isL2 } = useWallets();
  const { data: categories, isLoading: isL3 } = useCategories();
  const { data: recentTransactions, isLoading: isL4 } = useRecentTransactions();
  const { colors, fonts } = useNativeTheme();

  if (isL1 || isL2 || isL3 || isL4) return;

  if (
    user === null ||
    user === undefined ||
    wallets === null ||
    wallets === undefined ||
    categories === null ||
    categories === undefined ||
    recentTransactions === null ||
    recentTransactions === undefined
  )
    return Alert.alert("Error", "Undefined Data: Dashboard Screen");

  const firstName = user.fullName.split(" ")[0];
  const balance = wallets.reduce(
    (prev, curr) => prev + Number(curr.currentBalance),
    0
  );

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={fonts.title}>Hello, {firstName}</Text>

        <Pressable
          style={[styles.action, { backgroundColor: colors.background }]}
        >
          <MaterialIcons name="notifications" size={20} color={colors.text} />
        </Pressable>
      </View>

      <Link href="/wallets">
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Text style={{ textAlign: "center", color: colors.placeholder }}>
            Total Balance
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: colors.text,
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {formatAmount(balance)}
          </Text>
          <View
            style={{
              marginVertical: 10,
              borderTopWidth: 1,
              borderTopColor: "#f3f4f6",
            }}
          />
          <View style={{ gap: 6 }}>
            {wallets.map(({ id, name, currentBalance }) => (
              <View
                key={id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.placeholder }}>{name}</Text>
                <Text>{formatAmount(Number(currentBalance))}</Text>
              </View>
            ))}
          </View>
        </View>
      </Link>

      <View style={styles.actions}>
        <Link style={{ flex: 1 }} href="/transactions/modal">
          <View
            style={[
              {
                padding: 10,
                borderRadius: 20,
                width: "100%",
                alignItems: "center",
                backgroundColor: colors.danger,
              },
            ]}
          >
            <MaterialIcons name="add" size={20} color={colors.dangerText} />
            <Text style={{ color: colors.dangerText, fontSize: 16 }}>
              Add Expense
            </Text>
          </View>
        </Link>
        <Link style={{ flex: 1 }} href="/transfers/modal">
          <View
            style={[
              {
                padding: 10,
                borderRadius: 20,
                width: "100%",
                alignItems: "center",
                backgroundColor: colors.transfer,
              },
            ]}
          >
            <MaterialIcons name="add" size={20} color={colors.transferText} />
            <Text style={{ color: colors.transferText, fontSize: 16 }}>
              Add Transfer
            </Text>
          </View>
        </Link>
        <Link style={{ flex: 1 }} href="/transactions/modal">
          <View
            style={[
              {
                padding: 10,
                borderRadius: 20,
                width: "100%",
                alignItems: "center",
                backgroundColor: colors.success,
              },
            ]}
          >
            <MaterialIcons name="add" size={20} color={colors.successText} />
            <Text style={{ color: colors.successText, fontSize: 16 }}>
              Add Income
            </Text>
          </View>
        </Link>
      </View>

      <View style={{ flex: 1, paddingBottom: 6 }}>
        <View>
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: 600 }}>
            Recent Transactions
          </Text>
        </View>
        <FlatList
          data={recentTransactions}
          style={{ marginTop: 20 }}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <TransactionCard
              categories={categories}
              transaction={item}
              wallets={wallets}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  action: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 20,
    width: "100%",
    borderRadius: 20,
  },
  actions: {
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
