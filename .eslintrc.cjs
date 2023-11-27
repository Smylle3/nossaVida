module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
	  'eslint:recommended',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:react-hooks/recommended',
	  'prettier',
	  'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', '@typescript-eslint', 'react', 'react-hooks', 'import'],
	rules: {
	  'import/order': [
		'error',
		{
		  groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
		  'newlines-between': 'always',
		},
	  ],
	  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
	},
  };
  