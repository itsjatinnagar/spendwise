import StatementCard from "@/components/cards/statement-card";
import FAB from "@/components/common/fab";
import { useStatements } from "@/hooks/use-statements";
import { FlatList, StyleSheet, View } from "react-native";

export default function Screen() {
  const { data } = useStatements();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        keyExtractor={({ id }) => id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <StatementCard statement={item} />}
      />
      <FAB href="/imports/upload" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    gap: 16,
    paddingVertical: 20,
  },
});
