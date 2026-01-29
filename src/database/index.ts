import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

export const expoDB = openDatabaseSync("spendwise.db");
export const database = drizzle(expoDB, { casing: "snake_case", schema });
