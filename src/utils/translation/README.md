
# Translation System Documentation

This document explains the translation system used in the project.

## Overview

The translation system is designed to handle multiple languages (Hebrew, English, Russian, German, Arabic) with RTL support for Hebrew and Arabic.

## Directory Structure

```
src/
├── translations/             # Translation files
│   ├── he/                  # Hebrew translations (modular)
│   │   ├── index.ts         # Exports all Hebrew modules
│   │   ├── common.json      # Common translations
│   │   ├── navigation.json  # Navigation translations
│   │   └── ...              # Other domain-specific translations
│   ├── en.json              # English translations
│   ├── ru.json              # Russian translations
│   ├── de.json              # German translations
│   └── ar.json              # Arabic translations
└── utils/
    └── translation/         # Translation utilities
        ├── index.ts         # Main export file
        ├── core.ts          # Core translation functions
        ├── format.ts        # Format helpers
        ├── modules.ts       # Module loading
        └── types.ts         # Type definitions
```

## Key Concepts

### 1. Language Context

The `LanguageContext` provides the current language and translation function (`t`) to all components. Use the `useLanguage` hook to access it:

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

const MyComponent = () => {
  const { t, language, isRTL } = useLanguage();
  
  return <div>{t('common.hello')}</div>;
};
```

### 2. Translation Keys

Translation keys use dot notation to access nested properties:

- `common.hello` - Access "hello" key in common translations
- `navigation.home` - Access "home" key in navigation translations

### 3. Working with Nested Objects

Some translations are complex objects. Use the `returnObjects` option to get the full object:

```tsx
// Get a single string
const title = t('testimonials.patientTestimonial1.name');

// Get the entire object
const testimonial = t('testimonials.patientTestimonial1', { returnObjects: true });
console.log(testimonial.name, testimonial.text);
```

### 4. Variable Substitution

Use double curly braces to include variables in translations:

Translation: "Hello, {{name}}!"
Usage: `t('greeting', { name: 'John' })`

### 5. RTL Support

Use the `isRTL` flag from `useLanguage()` to conditionally apply RTL styles:

```tsx
const { isRTL } = useLanguage();

return (
  <div className={isRTL ? 'text-right' : 'text-left'}>
    {/* content */}
  </div>
);
```

Or use the directional style helpers:

```tsx
import { useDirectionalStyles } from '@/utils/direction';

const MyComponent = () => {
  const styles = useDirectionalStyles();
  
  return <div className={styles.textAlign}>Content</div>;
};
```

## Best Practices

1. **Keep Translations Modular** - Group translations by domain/feature
2. **Use Namespaces** - Prefix keys with feature name (e.g., `common.`, `navigation.`)
3. **Provide Context** - Add comments for translators when meaning might be ambiguous
4. **Handle Missing Translations** - Always provide a default value for important texts

## Translation Management

The admin panel includes a TranslationsTable component that helps manage and export translations.

## Troubleshooting

If you encounter missing translations:
1. Check that the translation key exists in the language files
2. Verify that the case matches exactly
3. For nested objects, ensure you're using the correct path
4. Check the console for translation warnings
