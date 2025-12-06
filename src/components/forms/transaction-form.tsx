import { Pressable, StyleSheet, Text, View } from "react-native";
import FormField from "../ui/form-field";
import { Category, CategoryType } from "@/models/category";
import { Wallet } from "@/models/wallet";
import { useEffect, useState } from "react";
import { useCreateTransaction } from "@/hooks/use-transaction";
import { Transaction } from "@/models/transaction";
import { uuid } from "@/utils/uuid";
import Button from "../ui/button";
import Label from "../ui/label";
import Chip from "../ui/chip";
import { useNativeTheme } from "@/utils/theme";
import Input from "../ui/input";
import { MaterialIcons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const initialState = {
  amount: "",
  category: "",
  note: "",
  timestamp: new Date(),
  type: CategoryType.EXPENSE,
  wallet: "",
};

type Props = {
  categories: Category[];
  wallets: Wallet[];
};
export default function TransactionForm({ categories, wallets }: Props) {
  const { isPending, mutateAsync: createTransaction } = useCreateTransaction();
  const [state, setState] = useState(initialState);
  const { colors } = useNativeTheme();

  useEffect(() => {
    setState((prev) => ({ ...prev, category: "" }));
  }, [state.type]);

  const reset = () => setState(initialState);

  async function handleSubmit() {
    if (
      !state.amount.trim().length ||
      !state.category.trim().length ||
      !state.wallet.trim().length
    )
      return;
    const transaction: Transaction = {
      amount: state.amount.trim(),
      categoryId: state.category,
      createdAt: new Date(),
      id: uuid(),
      note: state.note.trim().length ? state.note.trim() : null,
      relatedTxn: null,
      timestamp: state.timestamp,
      type: Number(state.type),
      walletId: state.wallet,
    };
    await createTransaction(transaction);
    reset();
  }

  const typeCategories = categories.filter(
    (value) => value.type === state.type
  );

  return (
    <View style={styles.form}>
      <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
        <Pressable
          style={[
            styles.pressable,
            {
              backgroundColor: state.type == 1 ? colors.danger : "transparent",
            },
          ]}
          onPress={() => setState((p) => ({ ...p, type: 1 }))}
        >
          <Text
            style={[
              styles.label,
              {
                color: state.type == 1 ? colors.dangerText : colors.text,
              },
            ]}
          >
            EXPENSE
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.pressable,
            {
              backgroundColor: state.type == 2 ? colors.success : "transparent",
            },
          ]}
          onPress={() => setState((p) => ({ ...p, type: 2 }))}
        >
          <Text
            style={[
              styles.label,
              {
                color: state.type == 2 ? colors.successText : colors.text,
              },
            ]}
          >
            INCOME
          </Text>
        </Pressable>
      </View>
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
        <Label>Categories</Label>
        <View style={styles.row}>
          {typeCategories.map((category) => (
            <Chip
              active={state.category === category.id}
              key={category.id}
              icon={
                <MaterialIcons
                  name="sell"
                  color={
                    state.category === category.id
                      ? colors.primary
                      : colors.text
                  }
                  size={14}
                />
              }
              label={category.name}
              onPress={() => setState((p) => ({ ...p, category: category.id }))}
            />
          ))}
        </View>
      </FormField>
      <FormField>
        <Label>Note</Label>
        <Input
          placeholder="New Shoes"
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
  wrapper: {
    height: 48,
    padding: 6,
    borderRadius: 20,
    flexDirection: "row",
  },
  pressable: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
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
