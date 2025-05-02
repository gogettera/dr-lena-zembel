
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import i18next from "eslint-plugin-i18next";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "i18next": i18next,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      
      // i18next plugin rules
      "i18next/no-literal-string": [
        "warn", 
        {
          // Exclude certain file patterns
          exclude: [
            "*.config.js",
            "*.config.ts",
            "*.d.ts",
            "*.test.{ts,tsx}",
            "*.spec.{ts,tsx}",
            "utils/**/*",
            "lib/**/*"
          ],
          // Mark these attributes as valid for literal strings (technical attrs)
          validAttributes: [
            "data-testid",
            "data-cy",
            "data-test",
            "to",
            "href",
            "src",
            "alt",
            "pattern",
            "className",
            "style",
            "type",
            "id",
            "key",
            "role",
            "name",
            "target",
            "rel",
            "aria-*",
            "dir"
          ],
          // Ignore certain JSX components from translation requirements
          ignoreComponent: [
            "code",
            "pre",
            "style",
            "script",
          ],
          // Our custom translation components and functions
          callees: ["t"],
          jsx: {
            allowedComponents: ["TranslatedText"]
          }
        }
      ]
    },
  }
);
