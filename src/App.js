import React from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';


function App() {
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <Login />
      </main>
    </React.Fragment>
  );
}

export default App;
