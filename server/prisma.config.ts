import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    url: "file:./prisma/database.sqlite",   // Path to DB file
  },
});
