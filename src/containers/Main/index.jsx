import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GlobalStyle } from 'core/assets/style/global';
import logo from 'core/assets/images/logo.svg';
import { AppHeader, AppContainer } from './styled';

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <AppContainer>
          <AppHeader>
            <p>Initial project structure</p>
            <Link to="/customers">Customers Page</Link>
          </AppHeader>
        </AppContainer>
        <GlobalStyle />
      </Fragment>
    );
  }
}

export default App;
