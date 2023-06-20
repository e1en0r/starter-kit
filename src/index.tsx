import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import '@phork/phorkit/styles/common.css';
import '@phork/phorkit/styles/fonts.css';
import '@phork/phorkit/styles/normalize.css';
import { themes } from 'config/themes';
import 'styles/global.css';

const App = React.lazy(() => import('components/App').then(({ App }) => ({ default: App })));

const urlParams = new URLSearchParams(window.location.search);
const isDark =
  urlParams.get('theme') === 'dark' ||
  (!urlParams.has('theme') && window.matchMedia?.('(prefers-color-scheme: dark)').matches);

const container = document.getElementById('root');
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <React.Suspense
      fallback={
        <div
          style={{
            background: themes[isDark ? 'dark' : 'light']['primary-palette-background-color'],
            color: themes[isDark ? 'dark' : 'light']['primary-palette-text-color'],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <svg height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <title>Loading ...</title>
            <g>
              <circle cx="4" cy="20" fill="currentColor" r="4" />
              <circle cx="20" cy="20" fill="currentColor" r="4" />
              <circle cx="36" cy="20" fill="currentColor" r="4" />
            </g>
          </svg>
        </div>
      }
    >
      <App themeId={isDark ? 'dark' : 'light'} />
    </React.Suspense>,
  );
}
