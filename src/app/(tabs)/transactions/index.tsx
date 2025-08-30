import TransactionCard from "@/components/transaction-card";
import Loader from "@/components/ui/loader";
import { useTransactions } from "@/hooks/use-transaction";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) return <Loader />;

  if (transactions === undefined)
    return Alert.alert("Error", "Undefined Data: Transactions Screen");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 28, fontWeight: 700 }}>My Transactions</Text>
        <Link href="/(tabs)/transactions/modal">
          <View style={styles.button}>
            <Feather name="plus" size={20} color="#FFFFFF" />
          </View>
        </Link>
      </View>
      <FlatList
        style={styles.list}
        data={transactions}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    height: 28,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1F1F",
    borderRadius: "50%",
  },
  list: {
    marginTop: 20,
    marginBottom: 40,
  },
});
