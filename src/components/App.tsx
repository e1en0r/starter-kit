import { AccessibilityProvider, Modals, Toasts, Theme, ThemeProvider } from '@phork/phorkit';
import { AppContent } from 'components/AppContent';

export type AppProps = {
  themeId: Theme;
};

export const App = ({ themeId }: AppProps): React.ReactElement => (
  <ThemeProvider themeId={themeId}>
    <AccessibilityProvider>
      <Toasts position="top-right">
        <Modals>
          <AppContent />
        </Modals>
      </Toasts>
    </AccessibilityProvider>
  </ThemeProvider>
);

App.displayName = 'App';
