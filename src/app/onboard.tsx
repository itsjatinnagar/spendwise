import Button from "@/components/common/button";
import Form from "@/components/common/form";
import FormField from "@/components/common/form-field";
import Input from "@/components/common/input";
import Text from "@/components/common/text";
import { useOnboardUser } from "@/hooks/use-onboard-user";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialState = {
  name: "",
  email: "",
};

export default function Screen() {
  const [state, setState] = useState(initialState);
  const { isPending, mutateAsync } = useOnboardUser();

  const handleChange = (name: keyof typeof initialState, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubit = async () => {
    if (!state.email.trim().length || !state.name.trim().length) return;
    await mutateAsync({
      email: state.email.trim(),
      name: state.name.trim(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <View>
          <Text.Title>Create Account</Text.Title>
          <Text>Fill in the information below to get started.</Text>
        </View>

        <Form>
          <FormField>
            <Text.Label>Full Name</Text.Label>
            <Input
              placeholder="John Doe"
              autoCapitalize="words"
              value={state.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          </FormField>

          <FormField>
            <Text.Label>Email Address</Text.Label>
            <Input
              placeholder="john.doe@email.com"
              keyboardType="email-address"
              value={state.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          </FormField>

          <Button onPress={handleSubit} disabled={isPending}>
            <Button.Label>Submit</Button.Label>
          </Button>
        </Form>

        <Text.Caption style={styles.footer}>
          By continuing you agree to our terms and privacy policy.
        </Text.Caption>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    gap: 24,
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    textAlign: "center",
  },
});
