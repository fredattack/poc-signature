/**
 * Custom ESLint rules for the Signature App project
 * These rules enforce project-specific patterns and best practices
 */

module.exports = {
  rules: {
    /**
     * Enforce proper async/await usage with try-catch blocks
     */
    'require-async-error-handling': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require try-catch blocks for async functions',
          category: 'Best Practices',
        },
        schema: [],
      },
      create(context) {
        return {
          FunctionDeclaration(node) {
            if (node.async && !hasTryCatch(node.body)) {
              context.report({
                node,
                message:
                  'Async functions should include error handling with try-catch blocks',
              });
            }
          },
          ArrowFunctionExpression(node) {
            if (
              node.async &&
              node.body.type === 'BlockStatement' &&
              !hasTryCatch(node.body)
            ) {
              context.report({
                node,
                message:
                  'Async arrow functions should include error handling with try-catch blocks',
              });
            }
          },
        };

        function hasTryCatch(body) {
          if (!body || !body.body) {
            return false;
          }
          return body.body.some(
            (statement) => statement.type === 'TryStatement'
          );
        }
      },
    },

    /**
     * Enforce type imports for TypeScript types
     */
    'enforce-type-imports': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce using type imports for TypeScript types',
          category: 'Best Practices',
        },
        fixable: 'code',
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            if (node.importKind !== 'type' && hasOnlyTypes(node)) {
              context.report({
                node,
                message: 'Use type imports for importing types only',
                fix(fixer) {
                  return fixer.insertTextBefore(node, 'type ');
                },
              });
            }
          },
        };

        function hasOnlyTypes(node) {
          return node.specifiers.every((spec) => {
            // This is a simplified check - in production, you'd want more robust type checking
            return spec.type === 'ImportSpecifier';
          });
        }
      },
    },
  },
};

function hasTryCatch(body) {
  if (!body || !body.body) {
    return false;
  }
  return body.body.some((statement) => statement.type === 'TryStatement');
}
