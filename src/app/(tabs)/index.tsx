import Text from "@/components/common/text";
import { useUser } from "@/hooks/use-user";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { data, isLoading } = useUser();

  if (isLoading || !data) return;

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <View>
        <Text.Caption>Welcome back,</Text.Caption>
        <Text.Title>{data.name}</Text.Title>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
    paddingHorizontal: 20,
  },
});
