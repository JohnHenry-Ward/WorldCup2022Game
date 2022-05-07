/* Libraries */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Main page */
import App from './App';

/* Other pages (routes) */
import Account from './routes/Account';
import League from './routes/League';
import Draft from './routes/Draft';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/account' element={<Account />} />
      <Route path='/league/:id' element={<League />} />
      <Route path='/draft/:id' element={<Draft />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
