import { Link, LinkProps } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../common/text";
import {
  formatAmount,
  formatDate,
  parsedTxnStatusLabel,
} from "@/utilities/lib";
import { parsedTxns } from "@/database/schema";

type Props = {
  parsedTxn: typeof parsedTxns.$inferSelect;
};
export default function ParsedTxnCard({ parsedTxn }: Props) {
  const href: LinkProps["href"] = {
    pathname: "/transactions/review",
    params: { id: parsedTxn.id },
  };

  return (
    <Link href={href} asChild>
      <Pressable style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.badge}>
            <Text.Caption>
              {parsedTxnStatusLabel(parsedTxn.status)}
            </Text.Caption>
          </View>
          <Text.Label numberOfLines={1}>{parsedTxn.description}</Text.Label>
          <View style={styles.row}>
            <Text.Caption>{formatAmount(parsedTxn.amount)}</Text.Caption>
            <Text.Caption>{formatDate(parsedTxn.timestamp)}</Text.Caption>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFF7E0",
  },
  wrapper: {
    gap: 8,
    alignItems: "flex-start",
  },
  badge: {
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: "#FFBA00",
  },
  row: {
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
