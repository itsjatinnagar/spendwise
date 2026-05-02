import Button from "@/components/common/button";
import Text from "@/components/common/text";
import { ArrowDownLeft } from "@/components/icons/arrow-down-left";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { Edit } from "@/components/icons/edit";
import { Trash } from "@/components/icons/trash";
import { useTransaction } from "@/hooks/use-transaction";
import { formatAmount, formatDate } from "@/utilities/lib";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useTransaction(id);

  if (!data) return;

  const color = data.amount > 0 ? "#1AA44A" : "#E7000B";

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          {data.amount > 0 ? (
            <ArrowDownLeft
              strokeWidth="4"
              width="20"
              height="20"
              color={color}
            />
          ) : (
            <ArrowUpRight
              strokeWidth="4"
              width="20"
              height="20"
              color={color}
            />
          )}
          <Text.Title style={{ color, fontSize: 40 }}>
            {formatAmount(Math.abs(data.amount))}
          </Text.Title>
        </View>
        <View>
          <Text.Label>Account</Text.Label>
          <Text>{data.account}</Text>
        </View>
        <View>
          <Text.Label>Category</Text.Label>
          <Text>{data.category}</Text>
        </View>
        <View>
          <Text.Label>Description</Text.Label>
          <Text>{data.description}</Text>
        </View>
        {data.note ?? (
          <View>
            <Text.Label>Note</Text.Label>
            <Text>{data.note}</Text>
          </View>
        )}
        <View>
          <Text.Label>Created At</Text.Label>
          <Text>{formatDate(data.timestamp)}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Button>
            <Edit />
            <Button.Label>Edit Transaction</Button.Label>
          </Button>
        </View>
        <View style={{ width: 48 }}>
          <Button color="#E7000B">
            <Trash color="#FFFFFF" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    gap: 16,
  },
  row: {
    gap: 16,
    alignItems: "center",
    flexDirection: "row",
  },
});
