import { Wallet } from "@/models/wallet";
import { useNativeTheme } from "@/utils/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  wallet: Wallet;
};
export default function WalletCard({ wallet }: Props) {
  const { colors } = useNativeTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          {wallet.name}
        </Text>

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
      <View>
        <Text style={{ color: colors.placeholder, fontSize: 16 }}>
          Current Balance
        </Text>
        <Text style={{ fontSize: 20 }}>
          {formatAmount(wallet.currentBalance)}
        </Text>
      </View>
      <View style={[styles.footer, { borderColor: "#f1f5f9" }]}>
        <View>
          <Text style={{ color: colors.placeholder }}>Initial Balance</Text>
          <Text>{formatAmount(wallet.initialBalance)}</Text>
        </View>
        <View>
          <Text style={{ color: colors.placeholder, textAlign: "right" }}>
            Created
          </Text>
          <Text style={{ textAlign: "right" }}>
            {formatDate(wallet.createdAt)}
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: 500,
  },
  row: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  action: {
    width: 28,
    height: 28,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}
