import { User, UserRow } from "@/models/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

const toJson = (entity: User): UserRow => ({
  id: entity.id,
  name: entity.name,
  email: entity.email,
  mobile: entity.mobile,
  created_at: entity.createdAt.toISOString(),
});

const fromJson = (row: UserRow): User => ({
  id: row.id,
  name: row.name,
  email: row.email,
  mobile: row.mobile,
  createdAt: new Date(row.created_at),
});

export const useUser = () => {
  const db = useSQLiteContext();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const row = await db.getFirstAsync<UserRow>(
        "SELECT * FROM users LIMIT 1"
      );
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
      await db.runAsync(
        `INSERT INTO users (id,name,email,mobile,created_at) VALUES (?,?,?,?,?)`,
        [
          request.id,
          request.name,
          request.email,
          request.mobile,
          request.created_at,
        ]
      );
    },
    onSuccess: () => {
      console.log("{useCreateUser}: onSuccess Inside Hook");
      client.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
