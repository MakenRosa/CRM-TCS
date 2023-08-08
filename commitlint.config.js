module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'chore', 'docs', 'style', 'test']],
      'scope-enum': [2, 'always', ['core', 'frontend', 'backend']]
    }
  };
  