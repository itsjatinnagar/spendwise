import type { Config } from "drizzle-kit";

export default {
    dialect: 'sqlite',
    driver: 'expo',
    casing: 'snake_case',
    out: './drizzle',
    schema: './src/database/schema.ts'
} satisfies Config;
