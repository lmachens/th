import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { AccountProvider } from './contexts/account';
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './components/common/ErrorBoundary';
import { HashRouter } from 'react-router-dom';

const queryClient = new QueryClient();

function App({ children }) {
  return (
    <HashRouter>
      <ErrorBoundary autoClose>
        <CacheProvider value={cache}>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <AccountProvider>{children}</AccountProvider>
          </QueryClientProvider>
        </CacheProvider>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
