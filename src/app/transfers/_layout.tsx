import { useNativeTheme } from "@/utils/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

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
          headerTitle: "Transfers",
          headerShadowVisible: false,
          headerRight: ({}) => (
            <Link href="/transfers/modal">
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
          headerTitle: "Create Transfer",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  action: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
});
