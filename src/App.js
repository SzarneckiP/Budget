import GlobalStyles from './index.css';

import { LoadingIndicator, Navigation, Wrapper, Button, Home } from 'components';
import { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';
import { useTranslation } from 'react-i18next';
import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';

import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React, { Fragment, useEffect } from 'react';

function App({ fetchBudget, fetchBudgetedCategories }) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
  }, [fetchBudget, fetchBudgetedCategories]);

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

const ConnectedApp = connect(state => {
  return {
    budget: state.budget.state.budget,
    budgetedCategories: state.budget
  }
}, {
  fetchBudget,
  fetchBudgetedCategories,
})(App);

const RootApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
