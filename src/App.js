import GlobalStyles from './index.css';

import { Navigation } from 'components';
import { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navigation items={[
          { content: 'Home', to: '/' },
          { content: 'Budget', to: '/budget' }
        ]} />

        <Switch>
          <Route exact path='/'>Home</Route>
          <Route path='/budget'>Budget</Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
