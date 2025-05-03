import { generateApi } from "swagger-typescript-api";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

generateApi({
  name: "Api.ts",
  output: path.resolve(__dirname, "./src/api"),
  input: path.resolve(__dirname, "./schema.json"),
  httpClientType: "axios",
  moduleNameIndex: 1,
  prettier: {
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "all",
    parser: "typescript",
  },
});
