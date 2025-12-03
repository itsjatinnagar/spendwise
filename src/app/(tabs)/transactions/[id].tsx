import { useTransaction } from "@/hooks/use-transaction";
import { useNativeTheme } from "@/utils/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
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
      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.primary,
            { backgroundColor: colors.primary },
          ]}
        >
          <MaterialIcons name="edit" size={20} color={colors.foreground} />
          <Text style={[styles.label, { color: colors.foreground }]}>
            Edit Transaction
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.delete,
            { backgroundColor: colors.danger },
          ]}
        >
          <MaterialIcons name="delete" size={24} color={colors.background} />
        </Pressable>
      </View>
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
