import Button from "@/components/common/button";
import Text from "@/components/common/text";
import { ArrowDownLeft } from "@/components/icons/arrow-down-left";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { Edit } from "@/components/icons/edit";
import { Ellipsis } from "@/components/icons/ellipsis";
import { Trash } from "@/components/icons/trash";
import { useTransaction } from "@/hooks/use-transaction";
import { formatAmount, formatDate } from "@/utilities/lib";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useTransaction(id);
  const { data: relatedTxn } = useTransaction(data?.relatedTxn!);

  const handleOpen = () => setVisible(true);

  const handleClose = () => setVisible(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleOpen} hitSlop={12}>
          <Ellipsis />
        </Pressable>
      ),
    });
  }, [navigation]);

  if (!data) return;

  const handleRefund = () => {
    handleClose();
    router.push({
      pathname: "/transactions/refunds/[id]",
      params: { id: data.id },
    });
  };

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
        {data.relatedTxn && (
          <View style={styles.card}>
            <View style={{ gap: 4 }}>
              <Text.Label>{relatedTxn?.category}</Text.Label>
              <Text.Caption>
                {formatDate(relatedTxn?.timestamp ?? Date())}
              </Text.Caption>
            </View>
            <Text.Label style={{ color: "#E7000B" }}>
              {formatAmount(relatedTxn?.amount ?? 0)}
            </Text.Label>
          </View>
        )}
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

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable style={styles.backdrop} onPress={handleClose}>
          <View style={styles.sheet}>
            {data.amount > 0 && (
              <Pressable onPress={handleRefund}>
                <Text.Label style={{ fontSize: 16 }}>Create Refund</Text.Label>
                <Text.Caption>
                  Lorem Ipsum is simply dummy text of the printing.
                </Text.Caption>
              </Pressable>
            )}
            <Pressable>
              <Text.Label style={{ fontSize: 16 }}>Create Loan</Text.Label>
              <Text.Caption>
                Lorem Ipsum is simply dummy text of the printing.
              </Text.Caption>
            </Pressable>
            <Pressable>
              <Text.Label style={{ fontSize: 16 }}>Create Invest</Text.Label>
              <Text.Caption>
                Lorem Ipsum is simply dummy text of the printing.
              </Text.Caption>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
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
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#0000001F",
  },
  sheet: {
    gap: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  card: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFF7E0",
    justifyContent: "space-between",
  },
});
