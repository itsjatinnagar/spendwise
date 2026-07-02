import Button from "@/components/common/button";
import Chip from "@/components/common/chip";
import Form from "@/components/common/form";
import FormField from "@/components/common/form-field";
import Input from "@/components/common/input";
import Text from "@/components/common/text";
import { AccountStatus, CategoryType } from "@/database/schema";
import { useAccounts } from "@/hooks/use-accounts";
import { useCategories } from "@/hooks/use-categories";
import { useCreateTransaction } from "@/hooks/use-create-transaction";
import { useKeyboardHeight } from "@/hooks/use-keyboard-height";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TxnType = "expense" | "income";

type State = {
  type: TxnType;
  accountId: string;
  categoryId: string;
  amount: string;
  description: string;
  note: string;
  date: string;
};

const today = () => new Date().toISOString().split("T")[0];

const initialState: State = {
  type: "expense",
  accountId: "",
  categoryId: "",
  amount: "",
  description: "",
  note: "",
  date: today(),
};

export default function Screen() {
  const [state, setState] = useState<State>(initialState);
  const { data: allAccounts } = useAccounts();
  const { data: allCategories } = useCategories();
  const { isPending, mutateAsync } = useCreateTransaction();
  const keyboardHeight = useKeyboardHeight();

  const handleChange = (name: keyof State, value: string) => {
    setState((prev) => {
      const next = { ...prev, [name]: value };
      // Reset category when switching type
      if (name === "type") next.categoryId = "";
      return next;
    });
  };

  const accounts = allAccounts?.filter(
    (a) => a.status === AccountStatus.ACTIVE,
  );

  const categoryType =
    state.type === "expense" ? CategoryType.EXPENSE : CategoryType.INCOME;
  const categories = allCategories?.filter((c) => c.type === categoryType);

  const isValid =
    state.accountId.trim().length > 0 &&
    state.categoryId.trim().length > 0 &&
    state.amount.trim().length > 0 &&
    !isNaN(Number(state.amount)) &&
    Number(state.amount) > 0 &&
    state.description.trim().length > 0 &&
    state.date.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;

    const rawAmount = Math.round(Number(state.amount) * 100);
    // Expenses are stored as negative values
    const amount = state.type === "expense" ? -rawAmount : rawAmount;
    const timestamp = new Date(state.date.trim()).toISOString();

    await mutateAsync({
      accountId: state.accountId,
      categoryId: state.categoryId,
      amount,
      description: state.description.trim(),
      note: state.note.trim() || null,
      timestamp,
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={undefined}>
        <ScrollView
          style={{ marginBottom: keyboardHeight }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Form>
            {/* Type toggle */}
            <FormField>
              <Text.Label>Type</Text.Label>
              <View style={styles.typeToggle}>
                <Chip
                  label="Expense"
                  selected={state.type === "expense"}
                  callback={() => handleChange("type", "expense")}
                />
                <Chip
                  label="Income"
                  selected={state.type === "income"}
                  callback={() => handleChange("type", "income")}
                />
              </View>
            </FormField>

            {/* Account */}
            <FormField>
              <Text.Label>Account</Text.Label>
              <View style={styles.row}>
                {accounts?.map((account) => (
                  <Chip
                    key={account.id}
                    label={account.name}
                    selected={account.id === state.accountId}
                    callback={() => handleChange("accountId", account.id)}
                  />
                ))}
              </View>
            </FormField>

            {/* Category */}
            <FormField>
              <Text.Label>Category</Text.Label>
              <View style={styles.row}>
                {categories?.map((category) => (
                  <Chip
                    key={category.id}
                    label={category.name}
                    selected={category.id === state.categoryId}
                    callback={() => handleChange("categoryId", category.id)}
                  />
                ))}
              </View>
            </FormField>

            {/* Amount */}
            <FormField>
              <Text.Label>Amount (₹)</Text.Label>
              <Input
                placeholder="0.00"
                value={state.amount}
                onChangeText={(text) => handleChange("amount", text)}
                keyboardType="decimal-pad"
              />
            </FormField>

            {/* Description */}
            <FormField>
              <Text.Label>Description</Text.Label>
              <Input
                placeholder="e.g. Grocery shopping"
                value={state.description}
                onChangeText={(text) => handleChange("description", text)}
                autoCapitalize="sentences"
              />
            </FormField>

            {/* Date */}
            <FormField>
              <Text.Label>Date</Text.Label>
              <Input
                placeholder="YYYY-MM-DD"
                value={state.date}
                onChangeText={(text) => handleChange("date", text)}
                keyboardType="numbers-and-punctuation"
              />
            </FormField>

            {/* Note (optional) */}
            <FormField>
              <Text.Label>Note (optional)</Text.Label>
              <Input
                placeholder="Any extra detail"
                value={state.note}
                onChangeText={(text) => handleChange("note", text)}
                autoCapitalize="sentences"
              />
            </FormField>

            <Button onPress={handleSubmit} disabled={isPending}>
              <Button.Label>Save Transaction</Button.Label>
            </Button>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  flex: {
    flex: 1,
    paddingBottom: 12,
  },
  typeToggle: {
    gap: 8,
    flexDirection: "row",
  },
  row: {
    gap: 8,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
