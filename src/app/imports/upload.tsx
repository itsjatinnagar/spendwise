import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { SymbolView } from "expo-symbols";
import Text from "@/components/common/text";
import FormField from "@/components/common/form-field";
import Button from "@/components/common/button";
import { useAccounts } from "@/hooks/use-accounts";
import { AccountType } from "@/database/schema";
import Chip from "@/components/common/chip";
import { router } from "expo-router";
import { useParse } from "@/hooks/use-parse";

export default function Screen() {
  const { data } = useAccounts();
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset>();
  const [accountId, setAccountId] = useState("");
  const { isPending, mutateAsync } = useParse();

  const handlePick = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.canceled) return;
    setFile(result.assets.at(0));
  };

  const handleSubmit = async () => {
    if (!file || !accountId.trim().length) return;
    const bank = data?.find(({ id }) => id === accountId)?.bank;
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    } as any);
    formData.append("bank", bank!);
    const fileName = file.name;
    await mutateAsync({ accountId, fileName, formData });
    router.back();
  };

  const accounts = data?.filter(({ type }) => type === AccountType.BANK);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ gap: 8 }}>
          <Pressable style={styles.picker} onPress={handlePick}>
            {file ? (
              <>
                <SymbolView name={{ android: "check_circle" }} size={32} />
                <Text style={{ fontWeight: 600 }}>File has been imported</Text>
                <Text.Caption style={{ textAlign: "center" }}>
                  Chosen file: {file.name}
                </Text.Caption>
              </>
            ) : (
              <>
                <SymbolView
                  name={{ android: "cloud_upload" }}
                  size={32}
                  colors="#000000"
                />
                <Text style={{ fontWeight: 600 }}>Select Statement File</Text>
                <Text.Caption style={{ textAlign: "center" }}>
                  Upload and parse in a secure flow.
                </Text.Caption>
              </>
            )}
          </Pressable>
          <Text.Caption style={{ fontSize: 12 }}>
            Supported Formats: .PDF .XLS .XLSX .CSV
          </Text.Caption>
        </View>
        <FormField>
          <Text.Label>Bank Account</Text.Label>
          <View style={styles.row}>
            {accounts?.map((account) => (
              <Chip
                key={account.id}
                label={`${account.name} - ${account.bank}`}
                selected={accountId === account.id}
                callback={() => setAccountId(account.id)}
              />
            ))}
          </View>
        </FormField>
        <Button disabled={isPending} onPress={handleSubmit}>
          <Button.Label>Upload</Button.Label>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    gap: 24,
    flex: 1,
    justifyContent: "center",
  },
  picker: {
    gap: 4,
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 32,
    alignItems: "center",
    borderStyle: "dashed",
    paddingHorizontal: 16,
    borderColor: "#62748E",
    justifyContent: "center",
  },
  row: {
    gap: 8,
    flexDirection: "column",
  },
});
