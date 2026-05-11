import StatementCard from "@/components/cards/statement-card";
import FAB from "@/components/common/fab";
import Loader from "@/components/common/loader";
import { useStatements } from "@/hooks/use-statements";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data, isLoading } = useStatements();

  if (isLoading) return <Loader />;

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        keyExtractor={({ id }) => id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <StatementCard statement={item} />}
      />
      <FAB href="/imports/upload" />
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
    paddingBottom: 60,
    paddingVertical: 20,
  },
});
