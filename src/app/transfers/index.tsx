import TransferCandidateCard from "@/components/cards/transfer-candidate-card";
import Text from "@/components/common/text";
import { usePotentialTransfers } from "@/hooks/use-potential-transfers";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data, isLoading } = usePotentialTransfers();

  const isEmpty = !isLoading && (!data || data.length === 0);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.creditId}-${item.debitId}`}
        contentContainerStyle={[styles.list, isEmpty && styles.listEmpty]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TransferCandidateCard candidate={item} />}
        ListEmptyComponent={
          isEmpty ? (
            <View style={styles.emptyState}>
              <Text.Title style={styles.emptyIcon}>⇄</Text.Title>
              <Text.Label style={styles.emptyTitle}>
                No pending transfers
              </Text.Label>
              <Text.Caption style={styles.emptyCaption}>
                When SpendWise detects a matching debit and credit across two
                accounts within 3 days, they'll appear here for you to confirm.
              </Text.Caption>
            </View>
          ) : null
        }
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
    paddingTop: 8,
    paddingBottom: 24,
  },
  listEmpty: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  emptyCaption: {
    color: "#777777",
    textAlign: "center",
    lineHeight: 22,
  },
});
