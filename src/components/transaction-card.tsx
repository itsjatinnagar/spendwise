import { useCategories } from "@/hooks/use-category";
import { useWallets } from "@/hooks/use-wallet";
import { Transaction } from "@/models/transaction";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Loader from "./ui/loader";
import { formatCurrency, formatDate } from "@/utils/formatter";

type Props = {
  transaction: Transaction;
};
export default function TransactionCard({ transaction }: Props) {
  const { data: wallets, isLoading: isL1 } = useWallets();
  const { data: categories, isLoading: isL2 } = useCategories();

  if (isL1 || isL2) return <Loader />;

  if (wallets === undefined || categories === undefined) return;

  const category = categories.find(
    (value) => value.id === transaction.categoryId
  );
  const wallet = wallets.find((value) => value.id === transaction.walletId);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ gap: 6 }}>
          <View style={styles.row}>
            <Feather name="tag" size={16} />
            <Text style={{ fontSize: 16 }}>{category?.name}</Text>
          </View>
          <View style={styles.row}>
            <Feather name="credit-card" size={16} />
            <Text style={{ fontSize: 16 }}>{wallet?.name}</Text>
          </View>
          <View style={styles.row}>
            <Feather name="calendar" size={16} />
            <Text style={{ fontSize: 16 }}>
              {formatDate(transaction.timestamp)}
            </Text>
          </View>
        </View>
        <Text
          style={[
            { fontSize: 18, fontWeight: 500 },
            transaction.type === "income"
              ? { color: "#036704" }
              : { color: "#C03C15" },
          ]}
        >
          {formatCurrency(transaction.amount)}
        </Text>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#7F7F7F",
          marginVertical: 10,
        }}
      />
      <Text style={{ fontSize: 16, color: "#4F575F" }}>{transaction.note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#1F89AF1F",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
