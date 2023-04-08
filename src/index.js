import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ProfileProvider } from './state/useProfile';
import { CategoryProvider } from './state/useCategory';
import { SeasonProvider } from './state/useSeason';
import { EpisodeProvider } from './state/useEpisode';
import { UserProvider } from './state/useUser';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProfileProvider>
      <UserProvider storageKey="UID" adminKey="checkAdmin">
        <CategoryProvider>
          <SeasonProvider storeKey="CID">
            <EpisodeProvider>
              <App />
            </EpisodeProvider>
          </SeasonProvider>
        </CategoryProvider>
      </UserProvider>
    </ProfileProvider>
  </React.StrictMode>
);


