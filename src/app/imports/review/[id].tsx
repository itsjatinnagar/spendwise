import ParsedTxnCard from "@/components/cards/parsed-txn-card";
import Button from "@/components/common/button";
import Text from "@/components/common/text";
import { parsedTxns, ParsedTxnStatus } from "@/database/schema";
import { useCommit } from "@/hooks/use-commit";
import { useParsedTxns } from "@/hooks/use-parsed-txns";
import { parsedTxnStatusLabel } from "@/utilities/lib";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useParsedTxns(id);
  const { isPending, mutateAsync } = useCommit();
  const [status, setStatus] = useState<ParsedTxnStatus | null>(null);

  const approved =
    data?.filter((val) => val.status === ParsedTxnStatus.APPROVED) ?? [];

  const transactions =
    status === null ? data : data?.filter((val) => val.status === status);

  const handleCommit = async () => {
    await mutateAsync(approved);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Header transactions={data} status={status} onSetStatus={setStatus} />
      <FlatList
        data={transactions}
        contentContainerStyle={styles.list}
        keyExtractor={({ id }) => id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ParsedTxnCard parsedTxn={item} />}
      />
      <Button onPress={handleCommit} disabled={isPending}>
        <Button.Label>Commit</Button.Label>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 28,
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    gap: 16,
  },
  header: {
    flexGrow: 0,
  },
  chip: {
    gap: 8,
    height: 28,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#BBBFCC",
    borderRadius: 14,
    paddingHorizontal: 12,
  },
});

function Header({
  transactions,
  status,
  onSetStatus,
}: {
  transactions: (typeof parsedTxns.$inferSelect)[] | undefined;
  status: ParsedTxnStatus | null;
  onSetStatus: React.Dispatch<React.SetStateAction<ParsedTxnStatus | null>>;
}) {
  const statuses = Object.values(ParsedTxnStatus).filter(
    (value) => typeof value === "number",
  );

  const renderChip = (value: ParsedTxnStatus) => {
    const count = transactions?.filter((val) => val.status === value).length;
    return (
      <Chip
        key={value.toString()}
        active={status === value}
        count={count}
        label={parsedTxnStatusLabel(value)}
        onPress={() => onSetStatus(value)}
      />
    );
  };

  return (
    <ScrollView
      style={styles.header}
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <Chip
        active={status === null}
        count={transactions?.length}
        label="All"
        onPress={() => onSetStatus(null)}
      />
      {statuses.map(renderChip)}
    </ScrollView>
  );
}

type VoidCallback = () => void;

function Chip({
  active = false,
  count,
  label,
  onPress,
}: {
  active?: boolean;
  count: number | undefined;
  label: string | undefined;
  onPress: VoidCallback;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active && { backgroundColor: "#FFF7E0", borderColor: "#FFF7E0" },
      ]}
    >
      <Text style={[active && { color: "#FFBA00" }]}>{label}</Text>
      <Text style={[active && { color: "#FFBA00" }]}>{count}</Text>
    </Pressable>
  );
}
