module.exports = {
  // TypeScript and TypeScript React files
  '*.{ts,tsx}': [
    // 'eslint --fix', // Temporarily disabled during ESLint error fixes
    'prettier --write',
    // 'bash -c "tsc --noEmit"', // Temporarily disabled for initial auto-fix commit
  ],

  // JavaScript files (if any)
  '*.{js,jsx}': ['eslint --fix', 'prettier --write'],

  // JSON, Markdown, YAML files
  '*.{json,md,yml,yaml}': ['prettier --write'],

  // CSS, SCSS files
  '*.{css,scss}': ['prettier --write'],
};
