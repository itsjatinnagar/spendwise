import { Category, CategoryRow } from "@/models/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

const toJson = (entity: Category): CategoryRow => ({
  created_at: entity.createdAt.toISOString(),
  id: entity.id,
  name: entity.name,
  parent_id: entity.parentId,
  type: entity.type,
});

const fromJson = (row: CategoryRow): Category => ({
  createdAt: new Date(row.created_at),
  id: row.id,
  name: row.name,
  parentId: row.parent_id,
  type: row.type,
});

export const useCategories = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const query = "SELECT * FROM categories";
      const rows = await db.getAllAsync<CategoryRow>(query);
      return rows.map((row) => fromJson(row));
    },
  });
};

export const useCreateCategory = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (category: Category) => {
      const request = toJson(category);
      const keys = Object.keys(request);
      const columns = `(${keys.join(", ")})`;
      const params = `(${keys.map(() => "?").join(", ")})`;

      const query = `INSERT INTO categories ${columns} VALUES ${params}`;
      const values = keys.map((key) => request[key as keyof CategoryRow]);
      await db.runAsync(query, values);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
