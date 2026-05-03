import Text from "@/components/common/text";
import { useCreateRefund } from "@/hooks/use-create-refund";
import { useTransactions } from "@/hooks/use-transactions";
import { formatAmount, formatDate } from "@/utilities/lib";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useTransactions();
  const { isPending, mutateAsync } = useCreateRefund();
  const transactions = data?.filter((item) => item.amount < 0);

  const handlePress = async (relatedTxn: string) => {
    await mutateAsync({ id, relatedTxn });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <FlatList
        data={transactions}
        keyExtractor={({ id }) => id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)} style={styles.card}>
            <View>
              <Text.Label>{item.account}</Text.Label>
              <Text.Caption>{formatDate(item.timestamp)}</Text.Caption>
            </View>
            <View>
              <Text.Label>{formatAmount(item.amount)}</Text.Label>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFF7E0",
    justifyContent: "space-between",
  },
});
