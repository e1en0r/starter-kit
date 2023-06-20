#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const program = require('commander')
const fs = require('fs')
const pkg = require('../package.json')
const writeFileSyncRecursive = require('./utils/write-file');

program
  .version(pkg.version)
  .usage('[options]')
  .option('-p, --parent <parent>', 'parent component (optional)')
  .requiredOption('-c, --component <component>', 'component name');

program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ scaffold-component --help');
  console.log('  $ scaffold-component -c Button');
  console.log('  $ scaffold-component -c ButtonGroup -p Button');
});

program.parse(process.argv);

const { component, parent } = program.opts();
const src = `./src/components/${parent || component}`;
const testSrc = `./__tests__/components/${parent || component}`;
const relativeSrc = '../'.repeat(2 + (parent ? (parent.match(/\//g) || []).length : 0));

if (typeof component === 'undefined') {
  console.log(chalk.red('Missing argument -c or --component. Try --help'))
  process.exit(1);
}

console.log(chalk.blue(`🤖 Generating ${component} in ${src}`))

const lcfirst = input => {
  return input.charAt(0).toLowerCase() + input.slice(1);
}

const ucfirst = input => {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

// generate the component boilerplate
writeFileSyncRecursive(`${src}/${component}.tsx`, `
import React from 'react';
import { cx } from '@emotion/css';
import { ThemeProps, useThemeId } from '@phork/phorkit';
import styles from './${component}.module.css';

export type ${component}Props = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    className?: string;
    style?: React.CSSProperties;
  };

export function ${component}({ children, className, themeId: initThemeId, unthemed, ...props }: ${component}Props): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(
        styles.${lcfirst(component)},
        themeId && !unthemed && styles[\`${lcfirst(component)}--\${themeId}\`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

${component}.displayName = '${component}';
`);

// generate the styles boilerplate
writeFileSyncRecursive(`${src}/${component}.module.css`, `
.${lcfirst(component)} {
}

.${lcfirst(component)}--light {
  color: $light-primary-palette-text-color;
}

.${lcfirst(component)}--dark {
  color: $dark-primary-palette-text-color;
}
`);

// generate the tests boilerplate
writeFileSyncRecursive(`${testSrc}/${component}.test.tsx`, `
import { render } from '@testing-library/react';
import { ${component} } from 'components/${component}';

describe('<${component} />', () => {
  it('should render', () => {
    const { queryByText } = render(
      <${component}>Hello world</${component}>,
    );
    expect(queryByText('Hello world')).toBeTruthy();
  });
});
`)

// generate or update the component index
if (fs.existsSync(`${src}/index.ts`)) {
  fs.appendFileSync(
    `${src}/index.ts`,
    `export * from './${component}';\n`
  );
} else {
  writeFileSyncRecursive(
    `${src}/index.ts`,
    `export * from './${component}';\n`
  );
}

// add the export to the index file
if (!parent) {
  const lines = [`export * from './${component}';`, ...fs.readFileSync('src/components/index.ts').toString().split('\n')].sort()
  writeFileSyncRecursive('src/components/index.ts', [...new Set(lines)].sort().join('\n'))
}

console.log(chalk.green(`🚀 Generated ${src}`));
