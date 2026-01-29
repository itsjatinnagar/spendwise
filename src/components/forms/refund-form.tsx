import { Transaction, TransactionType } from "@/models/transaction";
import { Wallet } from "@/models/wallet";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FormField from "../ui/form-field";
import Label from "../ui/label";
import Input from "../ui/input";
import Button from "../ui/button";
import { useCreateTransaction } from "@/hooks/use-transaction";
import { useState } from "react";
import { useNativeTheme } from "@/utils/theme";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Chip from "../ui/chip";
import { uuid } from "@/utils/uuid";
import { useRouter } from "expo-router";

const initialState = {
  amount: "",
  note: "",
  timestamp: new Date(),
  wallet: "",
};

type Props = {
  transaction: Transaction;
  wallets: Wallet[];
};
export default function RefundForm({ transaction, wallets }: Props) {
  const { isPending, mutateAsync: createTransaction } = useCreateTransaction();
  const [state, setState] = useState({
    ...initialState,
    wallet: transaction.walletId,
    note: `Re: ${transaction.note ?? ""}`.trim(),
  });
  const { colors } = useNativeTheme();
  const router = useRouter();

  async function handleSubmit() {
    if (!state.amount.trim().length) return;
    const reTransaction: Transaction = {
      amount: Number(state.amount.trim()),
      categoryId: transaction.categoryId,
      createdAt: new Date().toISOString(),
      id: uuid(),
      note: state.note.trim().length ? state.note.trim() : null,
      relatedTxn: transaction.id,
      timestamp: state.timestamp.toISOString(),
      type: TransactionType.REFUND,
      walletId: state.wallet,
    };
    await createTransaction(reTransaction);
    router.back();
  }

  return (
    <View style={styles.form}>
      <FormField>
        <Label>Amount</Label>
        <Input
          placeholder="9876.50"
          value={state.amount}
          onChangeText={(t) => setState((p) => ({ ...p, amount: t }))}
        />
      </FormField>
      <FormField>
        <Label>Date</Label>
        <Pressable
          style={[styles.input, { backgroundColor: colors.background }]}
          onPress={() =>
            DateTimePickerAndroid.open({
              value: state.timestamp,
              onChange: (_, date) =>
                setState((p) => ({ ...p, timestamp: date ?? p.timestamp })),
            })
          }
        >
          <Text>{formatDate(state.timestamp)}</Text>
        </Pressable>
      </FormField>
      <FormField>
        <Label>Wallets</Label>
        <View style={styles.row}>
          {wallets.map((wallet) => (
            <Chip
              active={state.wallet === wallet.id}
              key={wallet.id}
              label={wallet.name}
              onPress={() => setState((p) => ({ ...p, wallet: wallet.id }))}
            />
          ))}
        </View>
      </FormField>
      <FormField>
        <Label>Note</Label>
        <Input
          placeholder="Re: New Shoes"
          value={state.note}
          onChangeText={(t) => setState((p) => ({ ...p, note: t }))}
        />
      </FormField>
      <Button
        label={isPending ? "CREATING" : "CREATE"}
        disabled={isPending}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  row: {
    gap: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  input: {
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
