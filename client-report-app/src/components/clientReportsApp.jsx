import React, { useState } from 'react';
import Client from './client/client';
import Header from './header/header';
import { Provider } from 'react-redux';
import { store } from '../store';

const ClientReportApp = () => {

  return (
    <Provider store={store}>
      <div className="App">
        <h1 className='appHeader'>Client Report App</h1>
        <Header />
        <Client />
      </div>
    </Provider>
  )
}

export default ClientReportApp;
