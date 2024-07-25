import React from 'react';
import Navigation from './src/navigation/Routes';
import {SongsProvider} from './src/context/SongContext';
import {AlbumsProvider} from './src/context/AlbumsContext';
import {ArisitsProvider} from './src/context/ArtistContext';
import {ProfileProvider} from './src/context/ProfileContext';

export default function App() {
  return (
    <>
      <ProfileProvider>
        <ArisitsProvider>
          <AlbumsProvider>
            <Navigation />
          </AlbumsProvider>
        </ArisitsProvider>
      </ProfileProvider>
    </>
  );
}
