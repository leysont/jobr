# vite-react-ts + TailwindCSS + Catppuccin + Lucide Icons

This template is based on the [vite-react-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) template ([Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/))

**Additions:**
- [TailwindCSS](https://tailwindcss.com)
- [Catppuccin Colors](https://catppuccin.com) [for Tailwind](https://github.com/catppuccin/tailwindcss)
- [Lucide Icons](https://lucide.dev)
- Personal CSS styles (`index.css`)
  - Accent color variable
  - Fonts: [Maven Pro](https://fontsource.org/fonts/maven-pro), [Fira Code](https://fontsource.org/fonts/fira-code)
  - Text styles
  - Button style (normal, accent)
  - Card style (normal, accent)
- Personal code styles
  - `eslint.config.js`:
    - disabled: `@typescript-eslint/no-unused-vars`
    - warn: `prefer-const`
  - `tsconfig.json`:
    - disabled:
      - noUnusedParameters
      - noUnusedLocals

**To do:**
- Styles
  - Focus Style
  - Button Styles (warn, negative, positive)
  - Light Mode
  - Tab Component
  - Dropdown Component
  - Input Components (text, radio, checkbox, select)
  - Alert Component (success, error, warning, info)
  - Table Component

## Expanding the ESLint configuration

If you are developing a production application, **vite-react-ts** recommends updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
