import Button from "@/components/common/button";
import Chip from "@/components/common/chip";
import Form from "@/components/common/form";
import FormField from "@/components/common/form-field";
import Input from "@/components/common/input";
import Text from "@/components/common/text";
import { CategoryType, parsedTxns, ParsedTxnStatus } from "@/database/schema";
import { useCategories } from "@/hooks/use-categories";
import { useKeyboardHeight } from "@/hooks/use-keyboard-height";
import { useParsedTxn } from "@/hooks/use-parsed-txn";
import { useUpdateParsedTxn } from "@/hooks/use-update-parsed-txn";
import {
  formatAmount,
  formatDate,
  parsedTxnStatusLabel,
} from "@/utilities/lib";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInputContentSizeChangeEvent,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type State = {
  categoryId: string;
  note: string;
  status: ParsedTxnStatus;
};

const STATUSES = Object.values(ParsedTxnStatus).filter(
  (val) => typeof val === "number",
);

export default function Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useParsedTxn(id);

  const keyboardHeight = useKeyboardHeight();

  if (isLoading || !data) return;

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView style={styles.wrapper} behavior={undefined}>
        <ScrollView
          style={{ marginBottom: keyboardHeight }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Children txn={data} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type Props = {
  txn: typeof parsedTxns.$inferSelect;
};
function Children({ txn }: Props) {
  console.log(txn);
  const { data } = useCategories();
  const { isPending, mutateAsync } = useUpdateParsedTxn();
  const [state, setState] = useState<State>({
    categoryId: txn.categoryId ?? "",
    note: txn.note ?? "",
    status: txn.status,
  });
  const [height, setHeight] = useState(48);

  const TYPE = txn.amount < 0 ? CategoryType.EXPENSE : CategoryType.INCOME;
  const categories = data?.filter((val) => val.type === TYPE);

  const handleChange = (name: keyof State, value: string | number) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (event: TextInputContentSizeChangeEvent) => {
    setHeight(Math.abs(event.nativeEvent.contentSize.height));
  };

  const handleSubmit = async () => {
    if (!state.categoryId.trim().length) return;
    await mutateAsync({
      ...txn,
      categoryId: state.categoryId.trim(),
      note: state.note.trim() ?? null,
      status: state.status,
    });
    router.back();
  };

  return (
    <Form>
      <FormField>
        <Text.Label>Amount</Text.Label>
        <Input value={formatAmount(txn.amount)} readOnly />
      </FormField>
      <FormField>
        <Text.Label>Description</Text.Label>
        <Input
          value={txn.description}
          onContentSizeChange={handleSizeChange}
          style={{ height }}
          multiline
          readOnly
        />
      </FormField>
      <FormField>
        <Text.Label>Date</Text.Label>
        <Input value={formatDate(txn.timestamp)} readOnly />
      </FormField>
      <FormField>
        <Text.Label>Category</Text.Label>
        <View style={styles.row}>
          {categories?.map((val) => (
            <Chip
              key={val.id}
              label={val.name}
              selected={val.id === state.categoryId}
              callback={() => handleChange("categoryId", val.id)}
            />
          ))}
        </View>
      </FormField>
      <FormField>
        <Text.Label>Note</Text.Label>
        <Input
          placeholder="Additional Note"
          value={state.note}
          onChangeText={(text) => handleChange("note", text)}
          autoCapitalize="words"
        />
      </FormField>
      <FormField>
        <Text.Label>Status</Text.Label>
        <View style={styles.row}>
          {STATUSES.map((status) => (
            <Chip
              key={status}
              label={parsedTxnStatusLabel(status)}
              selected={state.status === status}
              callback={() => handleChange("status", status)}
            />
          ))}
        </View>
      </FormField>
      <Button onPress={handleSubmit} disabled={isPending}>
        <Button.Label>Save</Button.Label>
      </Button>
    </Form>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    paddingBottom: 12,
  },
  row: {
    gap: 8,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
