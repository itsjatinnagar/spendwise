import { Wallet } from "@/models/wallet";
import { formatCurrency, formatDate } from "@/utils/formatter";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  wallet: Wallet;
};
export default function WalletCard({ wallet }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="credit-card" size={24} />
        <Text style={{ fontSize: 18, fontWeight: 500 }} numberOfLines={1}>
          {wallet.name}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={{ color: "#1F1F1FDF" }}>Current Balance</Text>
        <Text style={{ fontSize: 24, fontWeight: 600 }}>
          {formatCurrency(wallet.currentBalance)}
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.section}>
          <Text style={{ color: "#1F1F1FDF" }}>Initial Balance</Text>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>
            {formatCurrency(wallet.startBalance)}
          </Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          {formatDate(wallet.createdAt)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#AFCFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  section: {
    gap: 2,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 60,
  },
});
