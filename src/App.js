import GlobalStyles from './index.css';

import { Navigation, Wrapper } from 'components';
import { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';
import { useTranslation } from 'react-i18next';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React from 'react';

function App() {

  const { i18n } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navigation items={[
          { content: 'Home', to: '/' },
          { content: 'Budget', to: '/budget' }
        ]}
          RightElement={(
            <div>
              <button onClick={() => i18n.changeLanguage('pl')}>pl</button>
              <button onClick={() => i18n.changeLanguage('en')}>en</button>
            </div>
          )} />
        <Wrapper>
          <Switch>
            <Route exact path='/'>Home</Route>
            <Route path='/budget'>Budget</Route>
          </Switch>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
}

const RootApp = () => {
  return (
    <React.Suspense fallback='Loading...'>
      <App />
    </React.Suspense>
  )
}

export default RootApp;
