import { useOnboard } from "@/contexts/onboard-context";
import { useCreateUser } from "@/hooks/use-user";
import { User } from "@/models/user";
import { uuid } from "@/utils/uuid";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../ui/button";
import FormField from "../ui/form-field";
import Input from "../ui/input";
import Label from "../ui/label";
import { useCreateWallet } from "@/hooks/use-wallet";
import categories from "@/../assets/data/categories.json";
import { Category } from "@/models/category";
import { Wallet, WalletType } from "@/models/wallet";
import { useCreateCategory } from "@/hooks/use-category";

export default function UserForm() {
  const [state, setState] = useState({
    fullName: "",
    email: "",
    balance: "",
  });
  const { onboard } = useOnboard();
  const { isPending: isP1, mutateAsync: createUser } = useCreateUser();
  const { isPending: isP2, mutateAsync: createWallet } = useCreateWallet();
  const { isPending: isP3, mutateAsync: createCategory } = useCreateCategory();

  const isPending = isP1 || isP2 || isP3;

  async function handleSubmit() {
    if (
      !state.fullName.trim().length ||
      !state.email.trim().length ||
      !state.balance.trim().length
    )
      return;
    categories.forEach(async (item) => {
      const category: Category = {
        createdAt: new Date().toISOString(),
        id: uuid(),
        name: item.name,
        type: item.type,
        parentId: null,
      };
      await createCategory(category);
    });
    const user: User = {
      createdAt: new Date().toISOString(),
      currency: "INR",
      email: state.email.trim(),
      fullName: state.fullName.trim(),
      id: uuid(),
    };
    await createUser(user);
    const wallet: Wallet = {
      createdAt: new Date().toISOString(),
      currentBalance: Number(state.balance.trim()),
      id: uuid(),
      initialBalance: Number(state.balance.trim()),
      name: "Physical Wallet",
      type: WalletType.CASH,
    };
    await createWallet(wallet);
    await onboard();
  }

  return (
    <View style={styles.form}>
      <FormField>
        <Label>Full Name</Label>
        <Input
          placeholder="John Doe"
          value={state.fullName}
          onChangeText={(t) => setState((p) => ({ ...p, fullName: t }))}
        />
      </FormField>

      <FormField>
        <Label>Email Address</Label>
        <Input
          placeholder="john.doe@email.com"
          value={state.email}
          onChangeText={(t) => setState((p) => ({ ...p, email: t }))}
        />
      </FormField>

      <FormField>
        <Label>Cash Balance</Label>
        <Input
          placeholder="9876.50"
          value={state.balance}
          onChangeText={(t) => setState((p) => ({ ...p, balance: t }))}
        />
      </FormField>

      <Button
        label={isPending ? "SETTING UP" : "SUBMIT"}
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
});
