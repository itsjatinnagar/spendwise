import { database } from "@/database";
import { users } from "@/database/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return (await database.select().from(users)).at(0);
    },
  });
};

export const useCreateUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (user: typeof users.$inferInsert) => {
      await database.insert(users).values(user);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
