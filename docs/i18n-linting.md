
# i18n Linting Rules

This project uses `eslint-plugin-i18next` to enforce proper internationalization practices.

## Key Features

- Detects hardcoded text that should be translated
- Ensures consistent use of translation functions
- Improves multilingual support across the codebase

## How it Works

The ESLint plugin will warn you when you include literal strings in your JSX that should be translated.

### Valid Approaches

```jsx
// Using the translation function
const { t } = useLanguage();
return <p>{t('common.greeting')}</p>;

// Using the TranslatedText component
return <TranslatedText textKey="common.greeting" />;
```

### Invalid Approaches (Will Trigger Warnings)

```jsx
// Hardcoded text - will trigger a warning
return <p>Hello, World!</p>;
```

## Exceptions

Some strings don't need translation. The following cases are automatically excluded:

- Technical attributes: `className`, `data-testid`, `href`, `src`, etc.
- Code inside utility files
- Test files
- Configuration files
- Contents of certain components like `<code>`, `<pre>`, etc.

## Fixing Linting Issues

1. Replace hardcoded strings with translation keys
2. Use the `useLanguage()` hook's `t()` function or `<TranslatedText>` component
3. Add the new keys to the appropriate translation files

## Custom Configuration

See `eslint.config.js` for the full configuration options.
