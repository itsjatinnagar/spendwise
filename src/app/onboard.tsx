import Input from "@/components/ui/input";
import { uuid } from "@/utils/uuid";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import categories from "../../assets/categories.json";
import { useCreateCategory } from "@/hooks/use-category";
import { useCreateUser } from "@/hooks/use-user";
import { useCreateWallet } from "@/hooks/use-wallet";
import { useOnboard } from "@/contexts/onboard-context";
import { Category } from "@/models/category";
import { User } from "@/models/user";
import { Wallet } from "@/models/wallet";

export default function Screen() {
  const [state, setState] = useState({
    name: "",
    email: "",
    mobile: "",
    balance: "",
  });
  const { onboard } = useOnboard();
  const { isPending: isPendingCategory, mutateAsync: createCategory } =
    useCreateCategory();
  const { isPending: isPendingUser, mutateAsync: createUser } = useCreateUser();
  const { isPending: isPendingWallet, mutateAsync: createWallet } =
    useCreateWallet();
  const isPending = isPendingCategory || isPendingUser || isPendingWallet;

  async function handleSubmit() {
    if (
      !state.name.trim().length ||
      !state.email.trim().length ||
      !state.mobile.trim().length ||
      !state.balance.trim().length
    )
      return;
    categories.forEach(async (item) => {
      const category: Category = {
        id: uuid(),
        name: item.name,
        type: item.type,
        createdAt: new Date(),
      };
      await createCategory(category);
    });
    const user: User = {
      id: uuid(),
      name: state.name.trim(),
      email: state.email.trim(),
      mobile: state.mobile.trim(),
      createdAt: new Date(),
    };
    await createUser(user);
    const wallet: Wallet = {
      id: uuid(),
      name: "CASH",
      startBalance: Number(state.balance.trim()),
      currentBalance: Number(state.balance.trim()),
      createdAt: new Date(),
    };
    await createWallet(wallet);
    await onboard();
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={styles.wrapper}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Get</Text>
            <Text style={styles.title}>Started.</Text>
          </View>
          <View style={styles.form}>
            <Input
              placeholder="Full Name"
              value={state.name}
              onChangeText={(t) => setState((p) => ({ ...p, name: t }))}
            />
            <Input
              placeholder="Email Address"
              keyboardType="email-address"
              value={state.email}
              onChangeText={(t) => setState((p) => ({ ...p, email: t }))}
            />
            <Input
              placeholder="Mobile Number"
              keyboardType="number-pad"
              value={state.mobile}
              onChangeText={(t) => setState((p) => ({ ...p, mobile: t }))}
            />
            <Input
              placeholder="Cash Balance"
              keyboardType="numeric"
              value={state.balance}
              onChangeText={(t) => setState((p) => ({ ...p, balance: t }))}
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
              <Text style={styles.label}>
                {isPending ? "SETTING UP" : "SUBMIT"}
              </Text>
            </Pressable>
          </View>
          <Text></Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "space-between",
    gap: 16,
  },
  title: {
    fontSize: 54,
    fontWeight: 700,
  },
  form: {
    gap: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 16,
    paddingVertical: 16,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 600,
  },
});
