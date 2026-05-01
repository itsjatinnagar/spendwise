import { statements, StatementStatus } from "@/database/schema";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../common/text";
import { formatDate, statementStatusLabel } from "@/utilities/lib";
import { ChevronRight } from "../icons/chevron-right";
import { CheckCircle } from "../icons/check-circle";
import { Clock } from "../icons/clock";

type Props = {
  statement: typeof statements.$inferSelect;
};

export default function StatementCard({ statement }: Props) {
  const isCompleted = statement.status === StatementStatus.COMPLETED;

  return (
    <Link href={`/imports/review/${statement.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.badge}>
            {isCompleted ? (
              <CheckCircle color="#FFBA00" />
            ) : (
              <Clock color="#FFBA00" />
            )}
            <Text.Caption style={{ textTransform: "uppercase" }}>
              {statementStatusLabel(statement.status)}
            </Text.Caption>
          </View>
          <View style={{ gap: 6 }}>
            <Text.Label numberOfLines={1}>{statement.fileName}</Text.Label>
            <Text.Caption>{formatDate(statement.createdAt)}</Text.Caption>
          </View>
        </View>
        <ChevronRight height="28" width="28" color="#FFBA00" />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF7E0",
  },
  wrapper: {
    gap: 6,
    alignItems: "flex-start",
  },
  badge: {
    gap: 4,
    height: 36,
    borderRadius: 36,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
