import Input from "@/components/ui/input";
import { useCreateWallet } from "@/hooks/use-wallet";
import { Wallet } from "@/models/wallet";
import { uuid } from "@/utils/uuid";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const initialState = {
  name: "",
  balance: "",
};

export default function Modal() {
  const { mutateAsync, isPending } = useCreateWallet();
  const [state, setState] = useState(initialState);

  async function handleSubmit() {
    if (!state.name.trim().length || !state.balance.trim().length) return;

    const wallet: Wallet = {
      id: uuid(),
      name: state.name.trim(),
      startBalance: Number(state.balance.trim()),
      currentBalance: Number(state.balance.trim()),
      createdAt: new Date(),
    };
    await mutateAsync(wallet);
    setState(initialState);
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, fontWeight: 700 }}>Create Wallet</Text>
      <View style={styles.form}>
        <Input
          placeholder="Name"
          value={state.name}
          onChangeText={(text) => setState((prev) => ({ ...prev, name: text }))}
        />
        <Input
          placeholder="Balance"
          value={state.balance}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, balance: text }))
          }
          keyboardType="numeric"
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: "#0F0F0FA4" },
            isPending && { backgroundColor: "#0F0F0F60" },
          ]}
          onPress={handleSubmit}
          disabled={isPending}
        >
          <Text style={styles.buttonLabel}>
            {isPending ? "SETTING UP" : "SUBMIT"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  form: {
    marginTop: 16,
    gap: 16,
  },
  choice: {
    padding: 8,
    borderWidth: 2,
    flex: 1,
    borderColor: "transparent",
    borderRadius: 16,
  },
  choiceLabel: { textAlign: "center", fontSize: 18 },
  button: {
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 16,
    paddingVertical: 16,
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 600,
  },
});
