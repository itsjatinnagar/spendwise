import { Category, CategoryRow } from "@/models/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

const toJson = (entity: Category): CategoryRow => ({
  id: entity.id,
  name: entity.name,
  type: entity.type,
  created_at: entity.createdAt.toISOString(),
});

const fromJson = (row: CategoryRow): Category => ({
  id: row.id,
  name: row.name,
  type: row.type,
  createdAt: new Date(row.created_at),
});

export const useCategories = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const rows = await db.getAllAsync<CategoryRow>(
        "SELECT * FROM categories"
      );
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
      await db.runAsync(
        `INSERT INTO categories (id,name,type,created_at) VALUES (?,?,?,?)`,
        [request.id, request.name, request.type, request.created_at]
      );
    },
    onSuccess: () => {
      console.log("{useCreateCategory}: onSuccess Inside Hook");
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
