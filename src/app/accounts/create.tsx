import Button from "@/components/common/button";
import Chip from "@/components/common/chip";
import Form from "@/components/common/form";
import FormField from "@/components/common/form-field";
import Input from "@/components/common/input";
import Text from "@/components/common/text";
import { AccountType } from "@/database/schema";
import { useCreateAccount } from "@/hooks/use-create-account";
import { accountTypeLabel } from "@/utilities/lib";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TYPES = Object.values(AccountType).filter((v) => typeof v === "number");

const initialState = {
  name: "",
  type: AccountType.CASH,
  bank: "",
};

export default function Screen() {
  const [state, setState] = useState(initialState);
  const { isPending, mutateAsync } = useCreateAccount();

  const handleChange = (
    name: keyof typeof initialState,
    value: string | number,
  ) => setState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async () => {
    if (!state.name.trim()) return;
    await mutateAsync({
      name: state.name.trim(),
      type: state.type,
      bank: state.bank.trim() || null,
    });
    router.back();
  };

  useEffect(() => {
    handleChange("bank", "");
  }, [state.type]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView>
        <Form>
          <FormField>
            <Text.Label>Account Name</Text.Label>
            <Input
              placeholder="e.g. HDFC Savings"
              autoCapitalize="words"
              value={state.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          </FormField>
          <FormField>
            <Text.Label>Type</Text.Label>
            <View style={styles.row}>
              {TYPES.map((type) => (
                <Chip
                  key={type}
                  label={accountTypeLabel(type)}
                  selected={state.type === type}
                  callback={() => handleChange("type", type)}
                />
              ))}
            </View>
          </FormField>
          {state.type === AccountType.BANK && (
            <FormField>
              <Text.Label>Bank Name</Text.Label>
              <View style={styles.row}>
                <Chip
                  key="JPB"
                  label="Jio Payments Bank"
                  selected={state.bank === "JPB"}
                  callback={() => handleChange("bank", "JPB")}
                />
                <Chip
                  key="HDFC"
                  label="HDFC Bank"
                  selected={state.bank === "HDFC"}
                  callback={() => handleChange("bank", "HDFC")}
                />
              </View>
            </FormField>
          )}
          <Button disabled={isPending} onPress={handleSubmit}>
            <Button.Label>Create Account</Button.Label>
          </Button>
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  row: {
    gap: 8,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
