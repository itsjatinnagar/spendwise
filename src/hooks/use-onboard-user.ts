import { useOnboard } from "@/contexts/onboard-context";
import { database } from "@/database";
import { categories, users } from "@/database/schema";
import { useMutation } from "@tanstack/react-query";
import categoryData from "@/assets/data/categories.json";
import * as Crypto from "expo-crypto";

type Params = {
  name: typeof users.$inferInsert.name;
  email: typeof users.$inferInsert.email;
};

export const useOnboardUser = () => {
  const { onboard } = useOnboard();

  return useMutation({
    mutationFn: async (params: Params) => {
      const values = { id: Crypto.randomUUID(), ...params };
      await database.insert(users).values(values);
      const categoryValues = categoryData.map((value) => ({
        id: Crypto.randomUUID(),
        ...value,
      }));
      await database.insert(categories).values(categoryValues);
      await onboard();
    },
  });
};
