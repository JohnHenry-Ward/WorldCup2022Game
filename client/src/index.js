/* Libraries */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Main page */
import App from './App';

/* Other pages (routes) */
import Account from './routes/Account';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/account' element={<Account />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
