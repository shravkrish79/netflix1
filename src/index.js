import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { CategoryProvider } from './state/useCategory';
import { SeasonProvider } from './state/useSeason';
import { EpisodeProvider } from './state/useEpisode';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoryProvider>
      <SeasonProvider storeKey="CID">
        <EpisodeProvider>
          <App />
        </EpisodeProvider>
      </SeasonProvider>
    </CategoryProvider>
  </React.StrictMode>
);


