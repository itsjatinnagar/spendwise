import { useUser } from "@/hooks/use-user";
import { useNativeTheme } from "@/utils/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { File } from "expo-file-system";
import { StorageAccessFramework as SAF } from "expo-file-system/legacy";
import { useWallets } from "@/hooks/use-wallet";
import { useTransactions } from "@/hooks/use-transaction";
import { useTransfers } from "@/hooks/use-transfer";

export default function Screen() {
  const { colors } = useNativeTheme();
  const { data: user, isLoading: isL1 } = useUser();

  const { data: wallets, isLoading: isL2 } = useWallets();
  const { data: transactions, isLoading: isL3 } = useTransactions();
  const { data: transfers, isLoading: isL4 } = useTransfers();

  if (isL1 || isL2 || isL3 || isL4) return;

  if (
    user === null ||
    user === undefined ||
    wallets === null ||
    wallets === undefined ||
    transactions === null ||
    transactions === undefined ||
    transfers === null ||
    transfers === undefined
  )
    return Alert.alert("Error", "Undefined Data: Profile Screen");

  async function handleExport() {
    const data = {
      wallets: wallets,
      transactions: transactions,
      transfers: transfers,
    };

    try {
      const string = JSON.stringify(data, null, 2);
      const permissions = await SAF.requestDirectoryPermissionsAsync();
      if (!permissions.granted) return;

      const uri = await SAF.createFileAsync(
        permissions.directoryUri,
        "backup_spendwise.json",
        "application/json"
      );
      const file = new File(uri);
      file.write(string);
    } catch (error) {
      console.error("Something Went Wrong", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={{ fontSize: 24, color: "#FFF" }}>
              {user.fullName.at(0)}
            </Text>
          </View>
          <View>
            <Text>{user.fullName}</Text>
            <Text>{user.email}</Text>
          </View>
        </View>
        <View
          style={{
            height: 30,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: "#fff",
          }}
        >
          <MaterialIcons name="chevron-right" size={20} />
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: colors.background }]}>
        <Link href="/wallets">
          <View style={styles.tile}>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>My Wallets</Text>
            <MaterialIcons name="chevron-right" size={22} />
          </View>
        </Link>
        <View style={{ borderTopWidth: 1, borderTopColor: "#f3f4f6" }} />
        <Link href="/transactions">
          <View style={styles.tile}>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>
              My Transactions
            </Text>
            <MaterialIcons name="chevron-right" size={22} />
          </View>
        </Link>
        <View style={{ borderTopWidth: 1, borderTopColor: "#f3f4f6" }} />
        <Link href="/transfers">
          <View style={styles.tile}>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>Transfers</Text>
            <MaterialIcons name="chevron-right" size={22} />
          </View>
        </Link>
        <View style={{ borderTopWidth: 1, borderTopColor: "#f3f4f6" }} />
        <Pressable onPress={handleExport}>
          <View style={styles.tile}>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>Export Data</Text>
            <MaterialIcons name="chevron-right" size={22} />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 20,
    borderRadius: 20,
    marginTop: 24,
    gap: 24,
  },
  tile: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
