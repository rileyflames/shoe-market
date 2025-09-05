import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default [
  // Apply to JS/TS files generally
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },

  // Base recommended JS rules
  js.configs.recommended,

  // Base recommended TypeScript rules (type-free)
  tsPlugin.configs.recommended,

  // Type-checked TypeScript rules merged with parserOptions for project
  {
    // start from the plugin's "recommended-requiring-type-checking" config then override parserOptions & rules
    ...tsPlugin.configs["recommended-requiring-type-checking"],
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    // merge or override rules with your custom choices
    rules: {
      ...(tsPlugin.configs["recommended-requiring-type-checking"].rules ?? {}),
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
    },
  },

  // Exclude the config file itself from being type-checked
  {
    files: ["eslint.config.mts"],
    // disable type-checked rules for this file by using the plugin's disabling config if present
    ...(tsPlugin.configs.disableTypeChecking ?? {}),
  },
];