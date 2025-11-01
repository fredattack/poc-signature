# Code Quality Checklist

Use this checklist to ensure your code meets quality standards before committing.

## Before Starting Work

- [ ] Latest code pulled from main branch
- [ ] Dependencies installed (`npm install`)
- [ ] IDE extensions installed (ESLint, Prettier)
- [ ] Auto-format on save enabled

## While Coding

- [ ] No red squiggly lines in editor (errors)
- [ ] TypeScript errors addressed immediately
- [ ] Imports organized automatically on save
- [ ] Code formatted on save

## Before Committing

### Run Quality Checks

```bash
# Run all quality checks
npm run quality

# If errors, try auto-fix
npm run quality:fix
```

- [ ] `npm run lint` passes (no ESLint errors)
- [ ] `npm run format:check` passes (code formatted)
- [ ] `npm run type-check` passes (no TypeScript errors)

### Code Review Self-Check

- [ ] No `any` types used (use proper types or `unknown`)
- [ ] No unused variables or imports
- [ ] All async functions have error handling
- [ ] No console.log (use console.warn/error if needed)
- [ ] StyleSheet entries are all used
- [ ] Styles use theme colors, not literals
- [ ] React Hooks dependencies are complete
- [ ] No disabled ESLint rules without good reason

### Common Fixes Applied

- [ ] Imports sorted alphabetically
- [ ] StyleSheet properties sorted alphabetically
- [ ] Code formatted with Prettier
- [ ] Unused code removed
- [ ] Types added where missing

## Commit Process

### Commit Message

Use conventional commit format:

```
type(scope): description

Examples:
feat(auth): add biometric login
fix(signature): resolve canvas touch issues
chore(lint): apply automatic linting fixes
docs(readme): update setup instructions
```

### Pre-commit Hook

The pre-commit hook will automatically:

- ✅ Run ESLint and auto-fix
- ✅ Format code with Prettier
- ✅ Type check TypeScript
- ❌ Block commit if errors remain

If hook fails:

1. Review error messages
2. Fix remaining issues
3. Stage fixed files: `git add .`
4. Retry commit

## Pull Request Checklist

- [ ] All commits have quality checks passing
- [ ] CI/CD pipeline is green
- [ ] No linting errors in changed files
- [ ] Code follows project conventions
- [ ] Types are properly defined
- [ ] Error handling is implemented
- [ ] No debug code left in (console.log, debugger)
- [ ] Self-reviewed code changes

## Code Review Checklist (For Reviewers)

### Quality

- [ ] No ESLint errors
- [ ] No TypeScript errors
- [ ] Code formatted consistently
- [ ] No unused imports or variables

### TypeScript

- [ ] Proper types used (no `any`)
- [ ] Return types specified for functions
- [ ] Null checks where needed
- [ ] Type imports used for types

### React/React Native

- [ ] Hooks used correctly
- [ ] Dependencies arrays complete
- [ ] No inline styles
- [ ] StyleSheet properties sorted
- [ ] Theme colors used

### Error Handling

- [ ] Async functions have try-catch or .catch()
- [ ] User-facing errors handled gracefully
- [ ] Error states displayed to user

### Performance

- [ ] No unnecessary re-renders
- [ ] Expensive operations memoized
- [ ] Lists use proper keys
- [ ] Images optimized

## Emergency Procedures

### Bypass Pre-commit Hook (Emergency Only!)

```bash
git commit --no-verify -m "emergency: description"
```

**Only use when:**
- Production is down
- Critical hotfix needed
- Will fix linting in immediate follow-up PR

**Never use for:**
- Regular commits
- Avoiding fix work
- Convenience

## Quick Commands Reference

```bash
# Check for issues
npm run lint
npm run type-check
npm run format:check

# Fix issues
npm run lint:fix
npm run format

# Full quality check
npm run quality
npm run quality:fix

# Git workflow
git status
git add .
git commit -m "message"
git push
```

## Common Issues

### Issue: Pre-commit hook is slow

**Solution:** Hook only runs on staged files. If slow:
- Check if you staged large files
- Ensure temp_expo and node_modules are ignored

### Issue: Auto-fix doesn't work in IDE

**Solution:**
1. Restart IDE
2. Check ESLint extension is enabled
3. Verify .eslintrc.js is valid
4. Check IDE settings for auto-fix on save

### Issue: Linting passes locally but fails in CI

**Solution:**
- Check Node.js version matches CI
- Run `npm ci` instead of `npm install`
- Clear node_modules and reinstall

### Issue: Too many linting errors

**Solution:**
1. Run `npm run lint:fix` first (fixes ~60%)
2. Run `npm run format` for formatting
3. Fix remaining errors incrementally
4. Focus on new code first

## Tips for Success

### DO ✅

- Fix linting errors as you code
- Use IDE auto-fix features
- Run quality checks before pushing
- Ask for help when stuck
- Read error messages carefully
- Keep dependencies updated

### DON'T ❌

- Disable rules without team approval
- Skip pre-commit hooks
- Leave console.log in production code
- Ignore TypeScript errors
- Use `@ts-ignore` everywhere
- Commit code that doesn't pass quality checks

## Success Indicators

You're doing it right when:

- ✅ IDE shows no errors
- ✅ Commits go through first try
- ✅ CI pipeline is always green
- ✅ Code reviews focus on logic, not style
- ✅ No linting comments in PR reviews

## Resources

Quick access to documentation:

- **5-min start:** `LINTING-QUICKSTART.md`
- **Quick fixes:** `.eslintrc.quick-reference.md`
- **Full docs:** `docs/LINTING-SETUP.md`
- **Summary:** `LINTING-SETUP-SUMMARY.md`

## Questions?

1. Check documentation files above
2. Ask team members
3. Review similar code in the project
4. Check official ESLint/TypeScript docs

---

**Remember:** Quality checks exist to help you write better code and catch issues early. They're tools to help, not obstacles to avoid!
