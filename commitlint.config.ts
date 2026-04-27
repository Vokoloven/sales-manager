import { RuleConfigSeverity } from '@commitlint/types';
import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'feat!',
        'fix',
        'fix!',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ],
    'header-max-length': [RuleConfigSeverity.Error, 'always', 250]
  }
};

export default config;
