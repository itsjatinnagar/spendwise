import Text from "@/components/common/text";
import { ArrowDownLeft } from "@/components/icons/arrow-down-left";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { useAnalytics } from "@/hooks/use-analytics";
import { formatAmount } from "@/utilities/lib";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Palette for category bars
const EXPENSE_COLORS = [
  "#FF6B6B",
  "#FF8E53",
  "#FFC107",
  "#FF5FAA",
  "#C77DFF",
  "#7B61FF",
];
const INCOME_COLORS = [
  "#1AA44A",
  "#00C9A7",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#88D8A3",
];

function ChevronLeft({ color }: { color: string }) {
  return (
    <Text style={{ color, fontSize: 18, fontWeight: "700", lineHeight: 22 }}>
      {"‹"}
    </Text>
  );
}
function ChevronRight({ color }: { color: string }) {
  return (
    <Text style={{ color, fontSize: 18, fontWeight: "700", lineHeight: 22 }}>
      {"›"}
    </Text>
  );
}

function SavingsRing({ rate }: { rate: number }) {
  const clamped = Math.max(0, Math.min(100, rate));
  const isPositive = rate >= 0;
  const color = isPositive ? "#1AA44A" : "#E7000B";

  return (
    <View style={ringStyles.wrapper}>
      {/* Track */}
      <View style={ringStyles.track} />
      {/* Fill bar as a simple arc using border trick */}
      <View
        style={[
          ringStyles.fill,
          { borderColor: color, opacity: 0.15 + (clamped / 100) * 0.85 },
        ]}
      />
      <View style={ringStyles.center}>
        <Text style={[ringStyles.rateText, { color }]}>
          {isPositive ? "+" : ""}
          {rate.toFixed(0)}%
        </Text>
        <Text.Caption style={ringStyles.rateLabel}>savings rate</Text.Caption>
      </View>
    </View>
  );
}

const ringStyles = StyleSheet.create({
  wrapper: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: "rgba(255,255,255,0.1)",
  },
  fill: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
  },
  center: {
    alignItems: "center",
    gap: 2,
  },
  rateText: {
    fontSize: 18,
    fontWeight: "800",
  },
  rateLabel: {
    color: "#AAAACC",
    fontSize: 10,
  },
});

function MoMBadge({
  current,
  prev,
  label,
}: {
  current: number;
  prev: number;
  label: string;
}) {
  if (prev === 0) return null;
  const diff = ((current - prev) / prev) * 100;
  const up = diff > 0;
  const color =
    label === "Income"
      ? up
        ? "#1AA44A"
        : "#E7000B"
      : up
        ? "#E7000B"
        : "#1AA44A";

  return (
    <View style={[momStyles.badge, { backgroundColor: color + "22" }]}>
      <Text style={[momStyles.arrow, { color }]}>{up ? "↑" : "↓"}</Text>
      <Text style={[momStyles.text, { color }]}>
        {Math.abs(diff).toFixed(0)}% vs last month
      </Text>
    </View>
  );
}

const momStyles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  arrow: { fontSize: 11, fontWeight: "700" },
  text: { fontSize: 11, fontWeight: "600" },
});

function CategoryBar({
  name,
  total,
  percentage,
  color,
  isLast,
}: {
  name: string;
  total: number;
  percentage: number;
  color: string;
  isLast: boolean;
}) {
  return (
    <View style={[catStyles.row, !isLast && catStyles.rowBorder]}>
      <View style={[catStyles.dot, { backgroundColor: color }]} />
      <Text.Caption style={catStyles.name} numberOfLines={1}>
        {name}
      </Text.Caption>
      <View style={catStyles.barTrack}>
        <View
          style={[
            catStyles.barFill,
            { width: `${percentage}%` as any, backgroundColor: color },
          ]}
        />
      </View>
      <Text.Caption style={catStyles.pct}>
        {percentage.toFixed(0)}%
      </Text.Caption>
      <Text.Caption style={catStyles.amount}>
        {formatAmount(total)}
      </Text.Caption>
    </View>
  );
}

const catStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  name: {
    width: 80,
    color: "#444444",
    fontSize: 12,
  },
  barTrack: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#F0F0F0",
    overflow: "hidden",
  },
  barFill: {
    height: 6,
    borderRadius: 6,
  },
  pct: {
    width: 30,
    color: "#888888",
    fontSize: 11,
    textAlign: "right",
  },
  amount: {
    width: 70,
    color: "#444444",
    fontSize: 11,
    textAlign: "right",
  },
});

function DayChart({
  pattern,
}: {
  pattern: { day: string; expense: number; income: number }[];
}) {
  const maxVal = Math.max(1, ...pattern.flatMap((p) => [p.expense, p.income]));
  return (
    <View style={dayStyles.container}>
      {pattern.map((p) => (
        <View key={p.day} style={dayStyles.col}>
          <View style={dayStyles.bars}>
            <View style={dayStyles.barPair}>
              <View
                style={[
                  dayStyles.bar,
                  dayStyles.incomeBar,
                  { height: Math.max(3, (p.income / maxVal) * 80) },
                ]}
              />
              <View
                style={[
                  dayStyles.bar,
                  dayStyles.expenseBar,
                  { height: Math.max(3, (p.expense / maxVal) * 80) },
                ]}
              />
            </View>
          </View>
          <Text.Caption style={dayStyles.label}>{p.day}</Text.Caption>
        </View>
      ))}
    </View>
  );
}

const dayStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 8,
  },
  col: {
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  bars: {
    height: 80,
    justifyContent: "flex-end",
  },
  barPair: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  bar: {
    width: 7,
    borderRadius: 4,
  },
  incomeBar: {
    backgroundColor: "#1AA44A",
  },
  expenseBar: {
    backgroundColor: "#FF6B6B",
  },
  label: {
    fontSize: 10,
    color: "#888888",
  },
});

export default function AnalyticsScreen() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");

  const { data, isLoading } = useAnalytics(year, month);

  const goBack = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const goForward = () => {
    const isCurrentMonth =
      year === now.getFullYear() && month === now.getMonth();
    if (isCurrentMonth) return;
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();
  const catData =
    activeTab === "expense"
      ? (data?.expenseCategoryBreakdown ?? [])
      : (data?.incomeCategoryBreakdown ?? []);
  const catColors = activeTab === "expense" ? EXPENSE_COLORS : INCOME_COLORS;

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text.Title style={styles.title}>Analytics</Text.Title>
          <Text.Caption style={styles.subtitle}>
            Monthly financial overview
          </Text.Caption>
        </View>

        {/* Month Selector */}
        <View style={styles.monthSelector}>
          <Pressable onPress={goBack} style={styles.monthBtn} hitSlop={12}>
            <ChevronLeft color="#FFBA00" />
          </Pressable>
          <Text style={styles.monthLabel}>
            {MONTHS[month]} {year}
          </Text>
          <Pressable
            onPress={goForward}
            style={styles.monthBtn}
            hitSlop={12}
            disabled={isCurrentMonth}
          >
            <ChevronRight color={isCurrentMonth ? "#CCCCCC" : "#FFBA00"} />
          </Pressable>
        </View>

        {/* Hero Summary Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text.Caption style={styles.heroLabel}>Net Balance</Text.Caption>
            <Text
              style={[
                styles.heroNet,
                { color: (data?.savings ?? 0) >= 0 ? "#1AA44A" : "#E7000B" },
              ]}
            >
              {formatAmount(data?.savings ?? 0)}
            </Text>

            <View style={styles.heroStats}>
              {/* Income */}
              <View style={styles.heroStatItem}>
                <View style={styles.heroStatIcon}>
                  <ArrowDownLeft color="#1AA44A" />
                </View>
                <View>
                  <Text.Caption style={styles.heroStatLabel}>
                    Income
                  </Text.Caption>
                  <Text style={styles.heroStatIncome}>
                    {formatAmount(data?.income ?? 0)}
                  </Text>
                  <MoMBadge
                    current={data?.income ?? 0}
                    prev={data?.prevMonthIncome ?? 0}
                    label="Income"
                  />
                </View>
              </View>

              {/* Expense */}
              <View style={styles.heroStatItem}>
                <View style={[styles.heroStatIcon, styles.heroStatExpIcon]}>
                  <ArrowUpRight color="#E7000B" />
                </View>
                <View>
                  <Text.Caption style={styles.heroStatLabel}>
                    Expense
                  </Text.Caption>
                  <Text style={styles.heroStatExpense}>
                    {formatAmount(data?.expense ?? 0)}
                  </Text>
                  <MoMBadge
                    current={data?.expense ?? 0}
                    prev={data?.prevMonthExpense ?? 0}
                    label="Expense"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Savings Ring */}
          <SavingsRing rate={data?.savingsRate ?? 0} />
        </View>

        {/* Day-of-Week Pattern */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text.Label style={styles.sectionTitle}>Spending by Day</Text.Label>
            <View style={styles.legend}>
              <View
                style={[styles.legendDot, { backgroundColor: "#1AA44A" }]}
              />
              <Text.Caption style={styles.legendText}>Income</Text.Caption>
              <View
                style={[styles.legendDot, { backgroundColor: "#FF6B6B" }]}
              />
              <Text.Caption style={styles.legendText}>Expense</Text.Caption>
            </View>
          </View>
          <View style={styles.card}>
            {isLoading ? (
              <View style={styles.loadingRow} />
            ) : (
              <DayChart pattern={data?.dailyPattern ?? []} />
            )}
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={styles.section}>
          <Text.Label style={styles.sectionTitle}>
            Category Breakdown
          </Text.Label>

          {/* Toggle */}
          <View style={styles.toggle}>
            <Pressable
              style={[
                styles.toggleBtn,
                activeTab === "expense" && styles.toggleActive,
              ]}
              onPress={() => setActiveTab("expense")}
            >
              <Text
                style={[
                  styles.toggleText,
                  activeTab === "expense" && styles.toggleActiveText,
                ]}
              >
                Expense
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.toggleBtn,
                activeTab === "income" && styles.toggleActive,
              ]}
              onPress={() => setActiveTab("income")}
            >
              <Text
                style={[
                  styles.toggleText,
                  activeTab === "income" && styles.toggleActiveText,
                ]}
              >
                Income
              </Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            {isLoading ? (
              <View style={styles.loadingRow} />
            ) : catData.length === 0 ? (
              <Text.Caption style={styles.emptyText}>
                No {activeTab} transactions this month.
              </Text.Caption>
            ) : (
              catData.map((cat, idx) => (
                <CategoryBar
                  key={cat.categoryId}
                  name={cat.categoryName}
                  total={cat.total}
                  percentage={cat.percentage}
                  color={catColors[idx % catColors.length]}
                  isLast={idx === catData.length - 1}
                />
              ))
            )}
          </View>
        </View>

        {/* Top Expenses */}
        <View style={styles.section}>
          <Text.Label style={styles.sectionTitle}>Top Expenses</Text.Label>
          {isLoading ? (
            <View style={[styles.card, styles.loadingRow]} />
          ) : (data?.topExpenses.length ?? 0) === 0 ? (
            <View style={[styles.card, styles.emptyCard]}>
              <Text.Caption style={styles.emptyText}>
                No expenses this month.
              </Text.Caption>
            </View>
          ) : (
            <View style={styles.card}>
              {data?.topExpenses.map((txn, idx) => (
                <View
                  key={txn.id}
                  style={[
                    styles.topExpRow,
                    idx < data.topExpenses.length - 1 && styles.topExpBorder,
                  ]}
                >
                  <View
                    style={[styles.topExpRank, { backgroundColor: "#1A1A2E" }]}
                  >
                    <Text style={styles.topExpRankText}>#{idx + 1}</Text>
                  </View>
                  <View style={styles.topExpMeta}>
                    <Text.Label numberOfLines={1}>{txn.description}</Text.Label>
                    <Text.Caption style={styles.topExpSub} numberOfLines={1}>
                      {txn.category} · {txn.account}
                    </Text.Caption>
                  </View>
                  <Text style={styles.topExpAmount}>
                    {formatAmount(Math.abs(txn.amount))}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scroll: { flex: 1 },
  container: {
    gap: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Header
  header: {
    paddingTop: 8,
    gap: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: "#777777",
  },

  // Month selector
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  monthBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,186,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A2E",
    minWidth: 160,
    textAlign: "center",
  },

  // Hero card
  heroCard: {
    borderRadius: 24,
    backgroundColor: "#1A1A2E",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#1A1A2E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  heroLeft: {
    flex: 1,
    gap: 12,
  },
  heroLabel: {
    color: "#AAAACC",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  heroNet: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  heroStats: {
    gap: 14,
  },
  heroStatItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  heroStatIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(26,164,74,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  heroStatExpIcon: {
    backgroundColor: "rgba(231,0,11,0.15)",
  },
  heroStatLabel: {
    color: "#AAAACC",
    fontSize: 11,
  },
  heroStatIncome: {
    color: "#1AA44A",
    fontSize: 15,
    fontWeight: "700",
  },
  heroStatExpense: {
    color: "#E7000B",
    fontSize: 15,
    fontWeight: "700",
  },

  // Sections
  section: { gap: 12 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: "#888888",
  },

  // Card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // Toggle
  toggle: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#1A1A2E",
  },
  toggleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888888",
  },
  toggleActiveText: {
    color: "#FFFFFF",
  },

  // Top expenses
  topExpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  topExpBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  topExpRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  topExpRankText: {
    color: "#FFBA00",
    fontSize: 10,
    fontWeight: "800",
  },
  topExpMeta: {
    flex: 1,
    gap: 2,
  },
  topExpSub: {
    color: "#AAAAAA",
    fontSize: 11,
  },
  topExpAmount: {
    color: "#E7000B",
    fontSize: 14,
    fontWeight: "700",
  },

  // Loading / empty
  loadingRow: {
    height: 80,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  emptyCard: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyText: {
    color: "#AAAAAA",
    textAlign: "center",
  },
});
