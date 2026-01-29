import { database } from "@/database";
import { categories } from "@/database/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await database.select().from(categories);
    },
  });
};

export const useCreateCategory = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (category: typeof categories.$inferInsert) => {
      await database.insert(categories).values(category);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
