import React, { Fragment } from 'react';
import GlobalStyles from './index.css';

import { LoadingIndicator, Navigation, Wrapper, Button } from 'components';
import { Home, Budget, NotFound } from 'Pages';

import { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

toast.configure();

function App() {

  const { i18n } = useTranslation();

  return (
    <Fragment>
      <GlobalStyles />
      <Router>
        <Navigation items={[
          { content: 'Home', to: '/' },
          { content: 'Budget', to: '/budget' }
        ]}
          RightElement={(
            <div>
              <Button variant='regular' onClick={() => i18n.changeLanguage('pl')}>pl</Button >
              <Button variant='regular' onClick={() => i18n.changeLanguage('en')}>en</Button >
            </div>
          )} />
        <Wrapper>
          <Switch>
            <Route exact path='/'><Home /></Route>
            <Route path='/budget'><Budget /></Route>
            <Route path='*'>
              <NotFound>
                <Button to='/'>Back to Home Page</Button>
              </NotFound>
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
})


const RootApp = () => {
  return (
    <QueryClientProvider client={queryClient} >
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<LoadingIndicator />}>
          <App />
        </React.Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default RootApp;
