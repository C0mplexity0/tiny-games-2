import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  globalIgnores(["**/dist/**/*", "src-tauri/**/*", "node_modules/**/*"]),
  { 
    files: ["src/**/*.{ts,mts,cts,tsx}"],
    plugins: { js, '@stylistic': stylistic }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser },
    rules: {
      "@stylistic/semi": ["error", "always"]
    }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
]);
