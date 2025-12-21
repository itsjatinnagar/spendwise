import { useNativeTheme } from "@/utils/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Layout() {
  const { colors, fonts } = useNativeTheme();

  const options = {
    contentStyle: {
      backgroundColor: colors.surface,
    },
  };

  return (
    <Stack screenOptions={options}>
      <Stack.Screen
        name="index"
        options={{
          headerTitleStyle: {
            color: fonts.title.color?.toString(),
            fontFamily: fonts.title.fontFamily,
            fontWeight: fonts.title.fontWeight,
          },
          headerTitle: "My Transactions",
          headerShadowVisible: false,
          headerRight: ({}) => (
            <Link href="/transactions/modal">
              <View
                style={[styles.action, { backgroundColor: colors.primary }]}
              >
                <MaterialIcons name="add" size={20} color={colors.text} />
              </View>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerTitle: "Create Transaction",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="refund"
        options={{
          presentation: "modal",
          headerTitle: "Create Refund",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerRight: ({}) => (
            <View style={styles.row}>
              <Pressable
                style={({ pressed }) => [
                  styles.action,
                  pressed && { backgroundColor: colors.surface },
                ]}
              >
                <MaterialIcons name="edit" size={20} color={colors.primary} />
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.action,
                  pressed && { backgroundColor: colors.danger },
                ]}
              >
                <MaterialIcons
                  name="delete"
                  size={20}
                  color={colors.dangerText}
                />
              </Pressable>
            </View>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  action: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
