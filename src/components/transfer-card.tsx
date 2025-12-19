import { Transfer } from "@/models/transfer";
import { Wallet } from "@/models/wallet";
import { useNativeTheme } from "@/utils/theme";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  transfer: Transfer;
  wallets: Wallet[];
};
export default function TransferCard({ transfer, wallets }: Props) {
  const { colors } = useNativeTheme();

  const fromWallet = wallets.find((val) => val.id === transfer.fromWallet)!;
  const toWallet = wallets.find((val) => val.id === transfer.toWallet)!;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View
          style={[
            {
              height: 32,
              width: 32,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            },
            { backgroundColor: colors.transfer },
          ]}
        >
          <Feather name="arrow-right" size={20} color={colors.transferText} />
        </View>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            {formatAmount(transfer.amount)}
          </Text>
          <Text style={{ marginTop: 6, color: colors.placeholder }}>
            Created {formatDate(transfer.timestamp)}
          </Text>
        </View>
        <View style={styles.row}>
          <Pressable
            style={({ pressed }) => [
              styles.action,
              pressed && { backgroundColor: colors.surface },
            ]}
          >
            <MaterialIcons name="edit" color={colors.primary} size={16} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.action,
              pressed && { backgroundColor: colors.danger },
            ]}
          >
            <MaterialIcons name="delete" color={colors.dangerText} size={16} />
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View style={[styles.wallet, { backgroundColor: colors.transfer }]}>
          <Text style={{ color: colors.placeholder }}>From</Text>
          <Text
            style={{ marginTop: 6, color: colors.text, fontSize: 16 }}
            numberOfLines={1}
          >
            {fromWallet.name}
          </Text>
        </View>
        <Feather name="arrow-right" size={20} color={colors.text} />
        <View style={[styles.wallet, { backgroundColor: colors.transfer }]}>
          <Text style={{ color: colors.placeholder }}>To</Text>
          <Text
            style={{ marginTop: 6, color: colors.text, fontSize: 16 }}
            numberOfLines={1}
          >
            {toWallet.name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
    borderRadius: 20,
  },
  header: {
    gap: 10,
    flexDirection: "row",
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: 500,
  },
  row: {
    gap: 10,
    marginLeft: "auto",
    flexDirection: "row",
  },
  action: {
    width: 28,
    height: 28,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  wallet: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
});

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatAmount(amount: string) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
  }).format(Number(amount));
}
