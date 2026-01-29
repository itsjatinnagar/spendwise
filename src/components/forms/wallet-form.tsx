import { StyleSheet, View } from "react-native";
import FormField from "../ui/form-field";
import Button from "../ui/button";
import { useCreateWallet } from "@/hooks/use-wallet";
import { useState } from "react";
import { Wallet, WalletType } from "@/models/wallet";
import { uuid } from "@/utils/uuid";
import Label from "../ui/label";
import Input from "../ui/input";
import Chip from "../ui/chip";

const initialState = {
  name: "",
  balance: "",
  type: 0,
};

export default function WalletForm() {
  const { isPending, mutateAsync: createWallet } = useCreateWallet();
  const [state, setState] = useState(initialState);

  const reset = () => setState(initialState);

  async function handleSubmit() {
    const wallet: Wallet = {
      createdAt: new Date().toISOString(),
      currentBalance: Number(state.balance.trim()),
      id: uuid(),
      initialBalance: Number(state.balance.trim()),
      name: state.name.trim(),
      type: Number(state.type),
    };
    await createWallet(wallet);
    reset();
  }

  const walletTypes = Object.values(WalletType).filter(
    (v) => typeof v === "number"
  );

  return (
    <View style={styles.form}>
      <FormField>
        <Label>Name</Label>
        <Input
          placeholder="Salary Account"
          value={state.name}
          onChangeText={(t) => setState((p) => ({ ...p, name: t }))}
        />
      </FormField>
      <FormField>
        <Label>Balance</Label>
        <Input
          placeholder="9876.50"
          value={state.balance}
          onChangeText={(t) => setState((p) => ({ ...p, balance: t }))}
        />
      </FormField>
      <FormField>
        <Label>Type</Label>
        <View style={styles.row}>
          {walletTypes.map((t) => (
            <Chip
              key={t}
              label={WalletType[t]}
              active={state.type === t}
              onPress={() => setState((p) => ({ ...p, type: t }))}
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
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
