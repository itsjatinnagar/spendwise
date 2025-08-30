import Input from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { useCategories } from "@/hooks/use-category";
import { useCreateTransaction } from "@/hooks/use-transaction";
import { useWallets } from "@/hooks/use-wallet";
import { Transaction } from "@/models/transaction";
import { formatCurrency, formatDate } from "@/utils/formatter";
import { uuid } from "@/utils/uuid";
import { Feather } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const initialState = {
  wallet: "",
  category: "",
  type: "expense",
  amount: "",
  timestamp: new Date(),
  note: "",
};

export default function Modal() {
  const { data: categories, isLoading: isL1 } = useCategories();
  const { data: wallets, isLoading: isL2 } = useWallets();
  const { mutateAsync, isPending } = useCreateTransaction();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState((prev) => ({ ...prev, category: "" }));
  }, [state.type]);

  if (isL1 || isL2) return <Loader />;

  if (categories === undefined || wallets === undefined)
    return Alert.alert("Error", "Undefined Data: Create Transaction Modal");

  const typeCategories = categories.filter(
    (value) => value.type === state.type
  );

  async function handleSubmit() {
    if (
      !state.amount.trim().length ||
      !state.category.trim().length ||
      !state.type.trim().length ||
      !state.wallet.trim().length
    )
      return;

    const transaction: Transaction = {
      id: uuid(),
      walletId: state.wallet.trim(),
      categoryId: state.category.trim(),
      type: state.type.trim(),
      amount: Number(state.amount.trim()),
      timestamp: state.timestamp,
      note: state.note,
    };
    await mutateAsync(transaction);
    setState(initialState);
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, fontWeight: 700 }}>Create Transaction</Text>
      <View style={styles.form}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            style={[
              styles.choice,
              { backgroundColor: "#0367041F" },
              state.type === "income" && { borderColor: "#036704" },
            ]}
            onPress={() => setState((prev) => ({ ...prev, type: "income" }))}
          >
            <Text
              style={[
                styles.choiceLabel,
                state.type === "income" && { color: "#036704" },
              ]}
            >
              Income
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.choice,
              { backgroundColor: "#C03C151F" },
              state.type === "expense" && { borderColor: "#C03C15" },
            ]}
            onPress={() => setState((prev) => ({ ...prev, type: "expense" }))}
          >
            <Text
              style={[
                styles.choiceLabel,
                state.type === "expense" && { color: "#C03C15" },
              ]}
            >
              Expense
            </Text>
          </Pressable>
        </View>
        <Input
          placeholder="Amount"
          value={state.amount}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, amount: text }))
          }
          keyboardType="numeric"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: "#AFAFAF",
            borderRadius: 16,
            gap: 8,
            height: 60,
          }}
          onPress={() => {
            DateTimePickerAndroid.open({
              value: state.timestamp,
              onChange(_, date) {
                setState((prev) => ({
                  ...prev,
                  timestamp: date ?? prev.timestamp,
                }));
              },
            });
          }}
        >
          <Text style={{ fontSize: 16 }}>{formatDate(state.timestamp)}</Text>
        </Pressable>
        <Input
          placeholder="Notes"
          value={state.note}
          onChangeText={(text) => setState((prev) => ({ ...prev, note: text }))}
          numberOfLines={3}
          multiline
        />
        <FlatList
          data={wallets}
          renderItem={({ item }) => (
            <Pressable
              style={[
                {
                  marginTop: 10,
                  padding: 8,
                  borderRadius: 16,
                  backgroundColor: "#0000001F",
                  borderWidth: 2,
                  borderColor: "transparent",
                  gap: 6,
                },
                state.wallet === item.id && { borderColor: "#1F1F1F" },
              ]}
              onPress={() => setState((prev) => ({ ...prev, wallet: item.id }))}
            >
              <Text>{item.name}</Text>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {formatCurrency(item.currentBalance)}
              </Text>
            </Pressable>
          )}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {typeCategories.map((category) => (
            <Pressable
              style={[
                {
                  paddingVertical: 4,
                  paddingHorizontal: 6,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  borderWidth: 2,
                  borderColor: "transparent",
                  backgroundColor: "#0000001F",
                  borderRadius: 16,
                },
                state.category === category.id && { borderColor: "#1F1F1F" },
              ]}
              onPress={() =>
                setState((prev) => ({ ...prev, category: category.id }))
              }
              key={category.id}
            >
              <Feather name="tag" />
              <Text>{category.name}</Text>
            </Pressable>
          ))}
        </View>
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
