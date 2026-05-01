import { database } from "@/database";
import { users } from "@/database/schema";
import { useQuery } from "@tanstack/react-query";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: () => database.select().from(users).limit(1),
    select: (data) => data[0] ?? null,
  });
