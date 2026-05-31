const STOP_WORDS = new Set(["UPI", "IMPS", "NEFT", "RTGS", "NACH", "ECS"]);

export function tokenize(description: string): Set<string> {
  const tokens = description
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(
      (token) =>
        token.length >= 2 && !STOP_WORDS.has(token) && !/^\d+$/.test(token),
    );
  return new Set(tokens);
}

export function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;

  let interSize = 0;
  for (const token of a) {
    if (b.has(token)) interSize++;
  }

  let unionSize = a.size + b.size - interSize;
  return unionSize === 0 ? 0 : interSize / unionSize;
}

export function inferCategory(
  description: string,
  history: History[],
  threshold: number = 0.4,
): Suggestion[] {
  if (history.length === 0) return [];

  const targetTokens = tokenize(description);
  if (targetTokens.size === 0) return [];

  const aggregates = new Map<string, Record>();

  for (const entry of history) {
    const score = jaccardSimilarity(targetTokens, tokenize(entry.description));
    if (score < threshold) continue;

    const existing = aggregates.get(entry.categoryId);
    if (!existing) {
      aggregates.set(entry.categoryId, {
        bestScore: score,
        count: 1,
        latestTime: entry.timestamp,
        note: entry.note,
      });
    } else {
      aggregates.set(entry.categoryId, {
        bestScore: Math.max(existing.bestScore, score),
        count: existing.count + 1,
        latestTime:
          entry.timestamp > existing.latestTime
            ? entry.timestamp
            : existing.latestTime,
        note: entry.note,
      });
    }
  }

  return Array.from(aggregates.entries())
    .map(([categoryId, { bestScore, count, latestTime, note }]) => ({
      categoryId,
      note: note,
      score: bestScore,
      count,
      latestTime,
    }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return b.latestTime.localeCompare(a.latestTime);
    })
    .map(({ categoryId, note, score }) => ({ categoryId, note, score }));
}

type History = {
  categoryId: string;
  description: string;
  note: string | null;
  timestamp: string;
};

type Suggestion = {
  categoryId: string;
  note: string | null;
  score: number;
};

type Record = {
  bestScore: number;
  count: number;
  latestTime: string;
  note: string | null;
};
