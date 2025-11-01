module.exports = {
  // TypeScript and TypeScript React files
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write', 'bash -c "tsc --noEmit"'],

  // JavaScript files (if any)
  '*.{js,jsx}': ['eslint --fix', 'prettier --write'],

  // JSON, Markdown, YAML files
  '*.{json,md,yml,yaml}': ['prettier --write'],

  // CSS, SCSS files
  '*.{css,scss}': ['prettier --write'],
};
