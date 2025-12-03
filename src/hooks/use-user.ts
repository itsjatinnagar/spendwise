import { User, UserRow } from "@/models/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

const toJson = (entity: User): UserRow => ({
  created_at: entity.createdAt.toISOString(),
  currency: entity.currency,
  email: entity.email,
  full_name: entity.fullName,
  id: entity.id,
});

const fromJson = (row: UserRow): User => ({
  createdAt: new Date(row.created_at),
  currency: row.currency,
  email: row.email,
  fullName: row.full_name,
  id: row.id,
});

export const useUser = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const query = "SELECT * FROM users LIMIT 1";
      const row = await db.getFirstAsync<UserRow>(query);
      return row ? fromJson(row) : null;
    },
  });
};

export const useCreateUser = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      const request = toJson(user);
      const keys = Object.keys(request);
      const columns = `(${keys.join(", ")})`;
      const params = `(${keys.map(() => "?").join(", ")})`;
      const values = keys.map((key) => request[key as keyof UserRow]);

      await db.runAsync(
        `INSERT INTO users ${columns} VALUES ${params}`,
        values
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
