import Text from "@/components/common/text";
import { useAcceptTransfer } from "@/hooks/use-accept-transfer";
import type { TransferCandidate } from "@/hooks/use-potential-transfers";
import { formatAmount, formatDate } from "@/utilities/lib";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

type Props = {
  candidate: TransferCandidate;
};

export default function TransferCandidateCard({ candidate }: Props) {
  const { isPending, mutate } = useAcceptTransfer();

  const handleAccept = () => {
    mutate({
      creditId: candidate.creditId,
      debitId: candidate.debitId,
    });
  };

  return (
    <View style={styles.container}>
      {/* Accounts row */}
      <View style={styles.accountsRow}>
        {/* Debit (from) side */}
        <View style={styles.accountBox}>
          <Text.Caption style={styles.directionLabel}>From</Text.Caption>
          <Text.Label numberOfLines={1}>{candidate.debitAccount}</Text.Label>
          <Text.Label style={styles.debitAmount}>
            {formatAmount(Math.abs(candidate.debitAmount))}
          </Text.Label>
        </View>

        {/* Arrow */}
        <View style={styles.arrowContainer}>
          <View style={styles.arrowLine} />
          <View style={styles.arrowHead} />
        </View>

        {/* Credit (to) side */}
        <View style={[styles.accountBox, styles.accountBoxRight]}>
          <Text.Caption style={styles.directionLabel}>To</Text.Caption>
          <Text.Label numberOfLines={1}>{candidate.creditAccount}</Text.Label>
          <Text.Label style={styles.creditAmount}>
            {formatAmount(candidate.creditAmount)}
          </Text.Label>
        </View>
      </View>

      {/* Date range */}
      <View style={styles.dateRow}>
        <Text.Caption style={styles.dateText}>
          {formatDate(candidate.debitTimestamp)}
        </Text.Caption>
        <Text.Caption style={styles.separator}>·</Text.Caption>
        <Text.Caption style={styles.dateText}>
          {formatDate(candidate.creditTimestamp)}
        </Text.Caption>
      </View>

      {/* Accept button */}
      <Pressable
        style={({ pressed }) => [styles.acceptButton, pressed && styles.pressed]}
        onPress={handleAccept}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#000000" size="small" />
        ) : (
          <Text.Label style={styles.acceptLabel}>Accept Transfer</Text.Label>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFF7E0",
  },
  accountsRow: {
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  accountBox: {
    flex: 1,
    gap: 4,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  accountBoxRight: {
    alignItems: "flex-end",
  },
  directionLabel: {
    color: "#777777",
    fontSize: 12,
  },
  debitAmount: {
    color: "#E7000B",
  },
  creditAmount: {
    color: "#1AA44A",
  },
  arrowContainer: {
    width: 28,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  arrowLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#FFBA00",
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderTopColor: "transparent",
    borderBottomWidth: 5,
    borderBottomColor: "transparent",
    borderLeftWidth: 8,
    borderLeftColor: "#FFBA00",
  },
  dateRow: {
    gap: 6,
    alignItems: "center",
    flexDirection: "row",
  },
  dateText: {
    color: "#55595F",
  },
  separator: {
    color: "#AAAAAA",
  },
  acceptButton: {
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFBA00",
  },
  pressed: {
    opacity: 0.8,
  },
  acceptLabel: {
    fontWeight: "600",
  },
});
