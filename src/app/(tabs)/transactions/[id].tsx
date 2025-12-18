import { useTransaction } from "@/hooks/use-transaction";
import { useNativeTheme } from "@/utils/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const { data: transaction, isLoading: isL1 } = useTransaction(id as string);
  const { colors, fonts } = useNativeTheme();

  if (isL1) return;

  if (transaction === null || transaction === undefined)
    return Alert.alert("Error", "Undefined Data: Transaction ID Screen");

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={fonts.title}>My Transaction</Text>
      </View>
      <Link href={`/transactions/refund?txnId=${transaction.id}`}>
        <View style={[styles.primary, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="rotate-left" size={20} color={colors.text} />
          <Text style={[styles.label, { color: colors.text }]}>
            Create Refund
          </Text>
        </View>
      </Link>
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
});
