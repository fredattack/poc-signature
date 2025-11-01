# Code Linting & Quality Setup

Complete documentation for the comprehensive linting and code quality system configured for the Signature App.

## Table of Contents

- [Overview](#overview)
- [Installed Tools](#installed-tools)
- [Configuration Files](#configuration-files)
- [Available Scripts](#available-scripts)
- [IDE Integration](#ide-integration)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Linting Rules](#linting-rules)
- [TypeScript Configuration](#typescript-configuration)
- [Common Issues & Solutions](#common-issues--solutions)
- [CI/CD Integration](#cicd-integration)

## Overview

This project uses a comprehensive code quality system that includes:

- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **TypeScript** with strict mode for type checking
- **Husky** for Git hooks
- **lint-staged** for pre-commit validation
- **React Native specific rules** for mobile development best practices

## Installed Tools

### Development Dependencies

```json
{
  "eslint": "^8.57.1",
  "@typescript-eslint/parser": "^7.18.0",
  "@typescript-eslint/eslint-plugin": "^7.18.0",
  "eslint-plugin-react": "^7.37.5",
  "eslint-plugin-react-hooks": "^4.6.2",
  "eslint-plugin-react-native": "^4.1.0",
  "prettier": "^3.6.2",
  "eslint-config-prettier": "^9.1.2",
  "eslint-plugin-prettier": "^5.5.4",
  "husky": "^9.1.7",
  "lint-staged": "^15.5.2"
}
```

## Configuration Files

### ESLint (.eslintrc.js)

Located at project root. Key features:

- TypeScript support with type-aware linting
- React and React Native rules
- React Hooks validation
- Prettier integration
- Custom rules for project patterns

### Prettier (.prettierrc.js)

Code formatting configuration:

```javascript
{
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'always'
}
```

### TypeScript (tsconfig.json)

Enhanced with additional strict checks:

- `noUncheckedIndexedAccess`: Safer array/object access
- `noImplicitOverride`: Explicit override keywords
- `allowUnreachableCode: false`: Catch dead code
- Declaration maps and source maps enabled

### lint-staged (.lintstagedrc.js)

Pre-commit validation for staged files:

- Runs ESLint with auto-fix
- Formats code with Prettier
- Type checks TypeScript files
- Validates JSON, Markdown, YAML

## Available Scripts

### Linting

```bash
# Run ESLint on all TypeScript/JavaScript files
npm run lint

# Run ESLint and auto-fix issues
npm run lint:fix
```

### Formatting

```bash
# Format all supported files with Prettier
npm run format

# Check formatting without making changes
npm run format:check
```

### Type Checking

```bash
# Run TypeScript compiler without emitting files
npm run type-check
```

### Combined Quality Checks

```bash
# Run all quality checks (lint + type-check + format:check)
npm run quality

# Run all quality checks with auto-fix
npm run quality:fix
```

## IDE Integration

### VSCode

Configuration files in `.vscode/`:

#### settings.json

- Auto-format on save with Prettier
- ESLint auto-fix on save
- Organize imports on save
- Workspace-specific TypeScript version
- Custom rulers at 80 and 120 characters

#### extensions.json

Recommended extensions:

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Expo Tools (`expo.vscode-expo-tools`)
- TypeScript (`ms-vscode.vscode-typescript-next`)
- Error Lens (`usernamehw.errorlens`)
- Code Spell Checker (`streetsidesoftware.code-spell-checker`)

### Setup Instructions

1. Install recommended extensions when prompted
2. Restart VSCode to apply settings
3. Verify auto-format works by saving a file

## Pre-commit Hooks

### Husky Configuration

Git hooks are managed by Husky in `.husky/`:

- **pre-commit**: Runs lint-staged on staged files

### What Happens on Commit

1. Husky intercepts the git commit
2. lint-staged identifies staged files
3. For each file type:
   - TypeScript/JavaScript: ESLint fix → Prettier → Type check
   - JSON/Markdown/YAML: Prettier format
4. If any check fails, commit is aborted
5. Auto-fixed files are staged automatically

### Bypass Hooks (Emergency Only)

```bash
# Skip pre-commit hooks (not recommended)
git commit --no-verify -m "emergency fix"
```

## Linting Rules

### TypeScript Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `@typescript-eslint/no-explicit-any` | error | Disallow `any` type |
| `@typescript-eslint/no-unused-vars` | error | No unused variables (except prefixed with `_`) |
| `@typescript-eslint/no-floating-promises` | error | Promises must be handled |
| `@typescript-eslint/no-misused-promises` | error | Promise type misuse |
| `@typescript-eslint/prefer-nullish-coalescing` | warn | Prefer `??` over `||` |
| `@typescript-eslint/prefer-optional-chain` | warn | Use optional chaining |

### React Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `react/react-in-jsx-scope` | off | Not needed in React 17+ |
| `react/prop-types` | off | Using TypeScript instead |
| `react-hooks/rules-of-hooks` | error | Hooks must follow rules |
| `react-hooks/exhaustive-deps` | warn | Complete dependency arrays |

### React Native Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `react-native/no-unused-styles` | error | Remove unused StyleSheet entries |
| `react-native/split-platform-components` | warn | Separate platform-specific code |
| `react-native/no-inline-styles` | warn | Use StyleSheet instead |
| `react-native/no-color-literals` | warn | Use theme colors |

### Code Quality Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `no-console` | warn | Avoid console (allow warn/error) |
| `prefer-const` | error | Use const when possible |
| `no-var` | error | Use let/const instead of var |
| `object-shorthand` | error | Use ES6 object shorthand |
| `prefer-template` | error | Template literals over concatenation |

## TypeScript Configuration

### Strict Mode Checks

All strict mode flags are enabled:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictBindCallApply": true,
  "strictPropertyInitialization": true
}
```

### Additional Checks

```json
{
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "allowUnreachableCode": false
}
```

## Common Issues & Solutions

### Issue: ESLint parsing errors

**Symptom**: "Parsing error: ESLint was configured to run on..."

**Solution**: Ensure file is included in `tsconfig.json` or add to `.eslintignore`

### Issue: Prettier conflicts with ESLint

**Symptom**: Code formatted by Prettier fails ESLint

**Solution**: Rules should be compatible. Run `npm run quality:fix` to auto-resolve

### Issue: Pre-commit hook fails

**Symptom**: Commit blocked due to linting errors

**Solution**:
1. Run `npm run quality:fix` to auto-fix issues
2. Manually fix remaining errors
3. Stage fixed files: `git add .`
4. Retry commit

### Issue: Type checking is slow

**Symptom**: `tsc --noEmit` takes too long

**Solution**:
- Add more exclusions to `tsconfig.json`
- Use `skipLibCheck: true` (already enabled)
- Consider incremental compilation

### Issue: Import sorting conflicts

**Symptom**: Imports keep getting reordered

**Solution**: Configure your IDE to use ESLint's import sorting:
```json
{
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
  }
}
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Code Quality

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run quality

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run type-check
```

### GitLab CI Example

```yaml
quality:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm run quality
```

## Maintenance

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update ESLint and plugins
npm update eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Update Prettier
npm update prettier eslint-config-prettier

# Update Husky and lint-staged
npm update husky lint-staged
```

### Adding New Rules

1. Edit `.eslintrc.js`
2. Add rule to appropriate section
3. Test with `npm run lint`
4. Document in this file

### Disabling Rules

For specific lines:
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = response;
```

For entire files:
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
// File contents
```

For patterns, add to `.eslintignore`:
```
**/*.generated.ts
**/migrations/*.ts
```

## Current Linting Status

As of the initial setup, the codebase has the following issues:

### Summary

- **Total errors**: ~150+ across multiple files
- **Total warnings**: ~10

### Common Issues Found

1. **Style sorting** (50+ occurrences)
   - StyleSheet properties not in alphabetical order
   - Violation: `react-native/sort-styles`

2. **Async/Promise handling** (20+ occurrences)
   - Floating promises without await/catch
   - Promise-returning functions in void contexts
   - Violations: `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-misused-promises`

3. **Import organization** (10+ occurrences)
   - Imports not in alphabetical order
   - Violation: `sort-imports`

4. **Prettier formatting** (30+ occurrences)
   - Line breaks, spacing inconsistencies
   - Violation: `prettier/prettier`

5. **Unused styles** (15+ occurrences)
   - StyleSheet definitions not being used
   - Violation: `react-native/no-unused-styles`

6. **Unused variables** (5+ occurrences)
   - Variables defined but not used
   - Violation: `@typescript-eslint/no-unused-vars`

7. **Color literals** (5+ occurrences)
   - Hardcoded colors instead of theme values
   - Violation: `react-native/no-color-literals`

### Recommended Actions

1. Run `npm run lint:fix` to auto-fix ~60% of issues
2. Run `npm run format` to fix all Prettier violations
3. Manually address:
   - Async/promise handling
   - Unused styles and variables
   - Theme color usage

## Best Practices

### Writing New Code

1. Enable auto-format on save in your IDE
2. Fix linting errors as you code (use Error Lens extension)
3. Run `npm run quality` before committing
4. Address all TypeScript errors (no `@ts-ignore`)

### Code Review Checklist

- [ ] No ESLint errors
- [ ] No TypeScript errors
- [ ] Code formatted with Prettier
- [ ] No unused variables or imports
- [ ] Async functions have error handling
- [ ] React Hooks dependencies are complete
- [ ] Styles use theme colors, not literals
- [ ] All StyleSheet entries are used

### Performance Tips

- Use `// eslint-disable-next-line` sparingly
- Fix issues incrementally, not all at once
- Focus on errors before warnings
- Use auto-fix features when available

## Resources

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [React Native ESLint Plugin](https://github.com/intellicode/eslint-plugin-react-native)
- [Husky Documentation](https://typicode.github.io/husky/)

## Changelog

- **2025-11-01**: Initial linting setup with ESLint, Prettier, Husky, and lint-staged
- TypeScript strict mode enabled with additional checks
- VSCode workspace settings configured
- Pre-commit hooks activated
- Custom project rules defined
