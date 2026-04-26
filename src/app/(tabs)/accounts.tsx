import AccountCard from "@/components/cards/account-card";
import FAB from "@/components/common/fab";
import Text from "@/components/common/text";
import { useAccounts } from "@/hooks/use-accounts";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data } = useAccounts();

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <Text.Title style={{ fontSize: 28 }}>My Accounts</Text.Title>
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        keyExtractor={({ id }) => id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <AccountCard account={item} />}
      />
      <FAB href="/accounts/create" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    gap: 16,
  },
});
