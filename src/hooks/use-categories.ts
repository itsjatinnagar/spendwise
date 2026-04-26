import { database } from "@/database";
import { categories } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return database.select().from(categories);
    },
  });
