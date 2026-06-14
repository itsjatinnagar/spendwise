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
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text.Caption>
              {parsedTxnStatusLabel(parsedTxn.status)}
            </Text.Caption>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {formatAmount(parsedTxn.amount)}
          </Text>
        </View>
        <Text.Caption style={{ color: "#3F4A4F" }}>
          {parsedTxn.description}
        </Text.Caption>
        <Text.Caption>{formatDate(parsedTxn.timestamp)}</Text.Caption>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFF7E0",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: {
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
