import Button from "@/components/common/button";
import Chip from "@/components/common/chip";
import Form from "@/components/common/form";
import FormField from "@/components/common/form-field";
import Input from "@/components/common/input";
import Text from "@/components/common/text";
import { AccountType } from "@/database/schema";
import { useAccounts } from "@/hooks/use-accounts";
import { useCreateInvest } from "@/hooks/use-create-invest";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type State = {
  accountId: string;
  amount: string;
  date: string;
};

export default function Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useAccounts();
  const { isPending, mutateAsync } = useCreateInvest();
  const [state, setState] = useState<State>({
    accountId: "",
    amount: "",
    date: "",
  });

  const handleChange = (name: keyof State, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !state.accountId.trim().length ||
      !state.amount.trim().length ||
      !state.date.trim().length
    )
      return;
    await mutateAsync({
      accountId: state.accountId.trim(),
      maturityAmount: Number(state.amount) * 100,
      maturityDate: new Date(state.date.trim()).toISOString(),
      transactionId: id,
    });
    router.back();
  };

  const accounts = data?.filter((val) => val.type === AccountType.INVEST);

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Form>
        <FormField>
          <Text.Label>Account</Text.Label>
          <View style={styles.row}>
            {accounts?.map((val) => (
              <Chip
                key={val.id}
                label={val.name}
                selected={val.id === state.accountId}
                callback={() => {
                  handleChange("accountId", val.id);
                }}
              />
            ))}
          </View>
        </FormField>
        <FormField>
          <Text.Label>Amount</Text.Label>
          <Input
            placeholder="9876.98"
            value={state.amount}
            onChangeText={(text) => handleChange("amount", text)}
          />
        </FormField>
        <FormField>
          <Text.Label>Date</Text.Label>
          <Input
            placeholder="YYYY-MM-DD"
            value={state.date}
            onChangeText={(text) => handleChange("date", text)}
          />
        </FormField>
        <Button onPress={handleSubmit} disabled={isPending}>
          <Button.Label>Submit</Button.Label>
        </Button>
      </Form>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  row: {
    gap: 8,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
