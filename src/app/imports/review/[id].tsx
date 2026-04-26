import ParsedTxnCard from "@/components/cards/parsed-txn-card";
import Button from "@/components/common/button";
import Text from "@/components/common/text";
import { ParsedTxnStatus } from "@/database/schema";
import { useCommit } from "@/hooks/use-commit";
import { useParsedTxns } from "@/hooks/use-parsed-txns";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useParsedTxns(id);
  const { isPending, mutateAsync } = useCommit();

  const approved =
    data?.filter((val) => val.status === ParsedTxnStatus.APPROVED) ?? [];

  const handleCommit = async () => {
    await mutateAsync(approved);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        keyExtractor={({ id }) => id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ParsedTxnCard parsedTxn={item} />}
      />
      <View style={styles.footer}>
        <Text.Caption style={styles.footerText}>
          {approved.length} of {data?.length ?? 0} will be committed.
        </Text.Caption>
        <Button onPress={handleCommit} disabled={isPending}>
          <Button.Label>Commit</Button.Label>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    gap: 16,
  },
  footer: {
    gap: 8,
  },
  footerText: {
    textAlign: "center",
  },
});
