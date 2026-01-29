import { useCreateTransfer } from "@/hooks/use-transfer";
import { Transfer } from "@/models/transfer";
import { uuid } from "@/utils/uuid";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FormField from "../ui/form-field";
import Label from "../ui/label";
import Input from "../ui/input";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useNativeTheme } from "@/utils/theme";
import Chip from "../ui/chip";
import { Wallet } from "@/models/wallet";
import Button from "../ui/button";

const initialState = {
  amount: "",
  from: "",
  to: "",
  timestamp: new Date(),
};

type Props = {
  wallets: Wallet[];
};
export default function TransferForm({ wallets }: Props) {
  const { isPending, mutateAsync: createTransfer } = useCreateTransfer();
  const [state, setState] = useState(initialState);
  const { colors } = useNativeTheme();

  const reset = () => setState(initialState);

  async function handleSubmit() {
    const transfer: Transfer = {
      amount: Number(state.amount.trim()),
      createdAt: new Date().toISOString(),
      fromWallet: state.from.trim(),
      id: uuid(),
      timestamp: state.timestamp.toISOString(),
      toWallet: state.to.trim(),
    };
    await createTransfer(transfer);
    reset();
  }

  const toWallets = wallets.filter((val) => val.id != state.from);

  useEffect(() => {
    setState((prev) => ({ ...prev, to: "" }));
  }, [state.from]);

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
        <Label>From Wallet</Label>
        <View style={styles.row}>
          {wallets.map((wallet) => (
            <Chip
              active={state.from === wallet.id}
              key={wallet.id}
              label={wallet.name}
              onPress={() => setState((p) => ({ ...p, from: wallet.id }))}
            />
          ))}
        </View>
      </FormField>
      <FormField>
        <Label>To Wallet</Label>
        <View style={styles.row}>
          {toWallets.map((wallet) => (
            <Chip
              active={state.to === wallet.id}
              key={wallet.id}
              label={wallet.name}
              onPress={() => setState((p) => ({ ...p, to: wallet.id }))}
            />
          ))}
        </View>
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
  input: {
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  row: {
    gap: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
