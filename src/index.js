import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { CategoryProvider } from './state/useCategory';
import { SeasonProvider } from './state/useSeason';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoryProvider>
      <SeasonProvider>
        <App />
      </SeasonProvider>
    </CategoryProvider>
  </React.StrictMode>
);


