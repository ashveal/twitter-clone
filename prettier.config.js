/** @type {import('prettier').Config} */
module.exports = {
    endOfLine: 'lf',
    tabWidth: 2,
    useTabs: false,
    semi: false,
    printWidth: 120,
    singleQuote: true,
    trailingComma: 'all',
    importOrder: [
      "^(react/(.*)$)|^(react$)",
      "^(next/(.*)$)|^(next$)",
      "<THIRD_PARTY_MODULES>",
      "",
      "^types$",
      "^@/types/(.*)$",
      "^@/config/(.*)$",
      "^@/lib/(.*)$",
      "^@/hooks/(.*)$",
      "^@/components/ui/(.*)$",
      "^@/components/(.*)$",
      "^@/styles/(.*)$",
      "^@/app/(.*)$",
      "",
      "^[./]",
    ],
    // importOrderSeparation: false,
    // importOrderSortSpecifiers: true,
    // importOrderBuiltinModulesToTop: true,
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    // importOrderMergeDuplicateImports: true,
    // importOrderCombineTypeAndValueImports: true,
    plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  }
