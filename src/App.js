import GlobalStyles from './index.css';

import { LoadingIndicator, Navigation, Wrapper, Button, Home } from 'components';
import { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';
import { useTranslation } from 'react-i18next';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React, { Fragment } from 'react';

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
            <Route exact path='/'>{Home}</Route>
            <Route path='/budget'>Budget</Route>
          </Switch>
        </Wrapper>
      </Router>
    </Fragment>
  );
}

const RootApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
