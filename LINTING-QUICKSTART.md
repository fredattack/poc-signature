# Linting Quick Start Guide

Get started with the code quality tools in under 5 minutes.

## Prerequisites

- Node.js 20+ installed
- Project dependencies installed (`npm install`)

## First Time Setup

### 1. Install IDE Extension

**VSCode:**
- Install "ESLint" extension by Microsoft
- Install "Prettier - Code formatter" extension
- Restart VSCode

**WebStorm/PhpStorm:**
- ESLint and Prettier are built-in
- Enable them in Settings → Languages & Frameworks → JavaScript

### 2. Verify Setup

```bash
# Check if linting works
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format all files
npm run format
```

### 3. Enable Auto-Fix on Save

**VSCode:** Already configured in `.vscode/settings.json`

**WebStorm:** Settings → Tools → Actions on Save → Check "Run eslint --fix"

## Daily Workflow

### Before Starting Work

```bash
# Pull latest changes
git pull

# Install any new dependencies
npm install
```

### While Coding

Your IDE will show linting errors in real-time:
- Red squiggly lines = errors (must fix)
- Yellow squiggly lines = warnings (should fix)

Files are auto-formatted and auto-fixed on save.

### Before Committing

```bash
# Run quality checks
npm run quality

# If errors, try auto-fix
npm run quality:fix

# Fix remaining manual errors, then commit
git add .
git commit -m "Your message"
```

The pre-commit hook will run automatically and block commits with errors.

## Common Commands

| Command | What it does |
|---------|--------------|
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Auto-fix linting errors |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without changes |
| `npm run type-check` | Run TypeScript compiler |
| `npm run quality` | Run all checks (lint + type + format) |
| `npm run quality:fix` | Run all checks with auto-fix |

## Quick Fixes

### Most Common Issues

1. **Import not sorted**
   - Run: `npm run lint:fix`

2. **Code not formatted**
   - Run: `npm run format`

3. **Promise not handled**
   - Add `.catch()` or use `void` keyword
   - See `.eslintrc.quick-reference.md` for examples

4. **Unused variable**
   - Remove it or prefix with `_` if intentionally unused

5. **Unused style**
   - Remove from StyleSheet or use it

### Emergency: Skip Pre-commit Hook

```bash
# Only if absolutely necessary!
git commit --no-verify -m "emergency fix"
```

## Getting Help

- **Quick reference**: `.eslintrc.quick-reference.md`
- **Full docs**: `docs/LINTING-SETUP.md`
- **Common fixes**: See examples in `.eslintrc.quick-reference.md`

## Tips

✅ **DO:**
- Fix linting errors as you code
- Use auto-fix features
- Run `npm run quality` before committing
- Ask for help if stuck

❌ **DON'T:**
- Disable rules without good reason
- Commit code with linting errors
- Skip pre-commit hooks
- Use `@ts-ignore` or `eslint-disable` everywhere

## Current Status

⚠️ **Note:** The codebase currently has ~150 linting errors that need to be fixed incrementally.

Priority fixes:
1. Auto-fixable issues (run `npm run lint:fix && npm run format`)
2. Promise handling errors (manual fix required)
3. Unused styles and variables (manual cleanup)
4. Theme color usage (replace literals with theme values)

## Success Metrics

You're doing it right when:
- ✅ Your IDE shows no red errors
- ✅ `npm run quality` passes
- ✅ Commits go through without hook failures
- ✅ Code reviews have no linting comments

---

**Questions?** Check the full documentation in `docs/LINTING-SETUP.md`
