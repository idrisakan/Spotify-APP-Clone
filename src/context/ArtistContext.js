import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const ArtistsContext = createContext();

const ArisitsProvider = ({children}) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getArtists = async () => {

    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'Türkiye de popüler',
        type: 'artists',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5'
      },
      headers: {
        'x-rapidapi-key': 'aa71a3486emsh76f2ce83cd8a069p112dedjsnf21196b27da4',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const data = response.data.artists.items;
      setArtists(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getArtists();
  }, []);

  return (
    <ArtistsContext.Provider value={{artists, loading, error}}>{children}</ArtistsContext.Provider>
  );
};

export {ArisitsProvider, ArtistsContext};
