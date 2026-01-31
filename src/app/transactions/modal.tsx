import TransactionForm from "@/components/forms/transaction-form";
import { useCategories } from "@/hooks/use-category";
import { useWallets } from "@/hooks/use-wallet";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
  const { data: categories, isLoading: isL1 } = useCategories();
  const { data: wallets, isLoading: isL2 } = useWallets();

  if (isL1 || isL2) return;

  if (
    categories === null ||
    categories === undefined ||
    wallets === null ||
    wallets === undefined
  )
    return Alert.alert("Error", "Undefined Data: Create Transaction Screen");

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TransactionForm categories={categories} wallets={wallets} />
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
});
