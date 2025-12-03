import UserForm from "@/components/forms/user-form";
import { useNativeTheme } from "@/utils/theme";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { colors, fonts } = useNativeTheme();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={styles.wrapper}>
        <View style={styles.content}>
          <View>
            <Text style={fonts.headline}>Get</Text>
            <Text style={fonts.headline}>Started.</Text>
          </View>

          <UserForm />

          <Text style={[styles.footer, { color: colors.placeholder }]}>
            By continuing you agree to our terms and privay policy.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  wrapper: {
    flex: 1,
  },
  content: {
    gap: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  footer: {
    fontSize: 13,
    textAlign: "center",
  },
});
