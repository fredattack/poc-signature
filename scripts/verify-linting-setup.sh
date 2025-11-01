#!/bin/bash

# Linting Setup Verification Script
# Verifies that all code quality tools are properly configured

set -e  # Exit on error

echo "=========================================="
echo "  Code Quality Setup Verification"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Success counter
CHECKS_PASSED=0
CHECKS_FAILED=0

# Function to check if a command exists
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 is not installed"
        ((CHECKS_FAILED++))
        return 1
    fi
}

# Function to check if a file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 is missing"
        ((CHECKS_FAILED++))
        return 1
    fi
}

# Function to check if a directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 is missing"
        ((CHECKS_FAILED++))
        return 1
    fi
}

# Function to check npm script
check_npm_script() {
    if npm run | grep -q "^  $1$"; then
        echo -e "${GREEN}✓${NC} npm script '$1' is configured"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} npm script '$1' is missing"
        ((CHECKS_FAILED++))
        return 1
    fi
}

echo "1. Checking prerequisites..."
echo "----------------------------"
check_command node
check_command npm
echo ""

echo "2. Checking configuration files..."
echo "-----------------------------------"
check_file ".eslintrc.js"
check_file ".prettierrc.js"
check_file ".prettierignore"
check_file ".lintstagedrc.js"
check_file "tsconfig.json"
check_file ".husky/pre-commit"
echo ""

echo "3. Checking documentation..."
echo "----------------------------"
check_file "docs/LINTING-SETUP.md"
check_file "LINTING-QUICKSTART.md"
check_file ".eslintrc.quick-reference.md"
check_file "LINTING-SETUP-SUMMARY.md"
echo ""

echo "4. Checking IDE integration..."
echo "-------------------------------"
check_file ".vscode/settings.json"
check_file ".vscode/extensions.json"
echo ""

echo "5. Checking CI/CD configuration..."
echo "-----------------------------------"
check_file ".github/workflows/code-quality.yml"
check_file ".github/LINTING-CHECKLIST.md"
echo ""

echo "6. Checking custom rules..."
echo "---------------------------"
check_dir ".eslint-rules"
check_file ".eslint-rules/index.js"
echo ""

echo "7. Checking npm scripts..."
echo "--------------------------"
check_npm_script "lint"
check_npm_script "lint:fix"
check_npm_script "format"
check_npm_script "format:check"
check_npm_script "type-check"
check_npm_script "quality"
check_npm_script "quality:fix"
echo ""

echo "8. Checking node_modules (key packages)..."
echo "-------------------------------------------"
if [ -d "node_modules" ]; then
    check_dir "node_modules/eslint"
    check_dir "node_modules/prettier"
    check_dir "node_modules/@typescript-eslint/parser"
    check_dir "node_modules/@typescript-eslint/eslint-plugin"
    check_dir "node_modules/eslint-plugin-react"
    check_dir "node_modules/eslint-plugin-react-hooks"
    check_dir "node_modules/eslint-plugin-react-native"
    check_dir "node_modules/husky"
    check_dir "node_modules/lint-staged"
else
    echo -e "${RED}✗${NC} node_modules not found. Run 'npm install'"
    ((CHECKS_FAILED+=9))
fi
echo ""

echo "9. Running quick tests..."
echo "-------------------------"

# Test ESLint
if npx eslint --version &> /dev/null; then
    echo -e "${GREEN}✓${NC} ESLint is executable"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} ESLint failed to execute"
    ((CHECKS_FAILED++))
fi

# Test Prettier
if npx prettier --version &> /dev/null; then
    echo -e "${GREEN}✓${NC} Prettier is executable"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} Prettier failed to execute"
    ((CHECKS_FAILED++))
fi

# Test TypeScript
if npx tsc --version &> /dev/null; then
    echo -e "${GREEN}✓${NC} TypeScript is executable"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} TypeScript failed to execute"
    ((CHECKS_FAILED++))
fi

# Test Husky
if [ -x ".husky/pre-commit" ]; then
    echo -e "${GREEN}✓${NC} Pre-commit hook is executable"
    ((CHECKS_PASSED++))
else
    echo -e "${YELLOW}⚠${NC} Pre-commit hook is not executable (run: chmod +x .husky/pre-commit)"
    ((CHECKS_FAILED++))
fi

echo ""
echo "=========================================="
echo "  Verification Summary"
echo "=========================================="
echo ""
echo -e "Checks passed: ${GREEN}${CHECKS_PASSED}${NC}"
echo -e "Checks failed: ${RED}${CHECKS_FAILED}${NC}"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run 'npm run lint' to check for linting errors"
    echo "2. Run 'npm run quality:fix' to auto-fix issues"
    echo "3. Read 'LINTING-QUICKSTART.md' for usage guide"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Some checks failed${NC}"
    echo ""
    echo "Please fix the issues above and run this script again."
    echo "For help, see 'docs/LINTING-SETUP.md'"
    echo ""
    exit 1
fi
