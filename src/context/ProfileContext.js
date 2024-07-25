import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
const ProfileContext = createContext();

const ProfileProvider = ({children}) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfileData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/user_profile/',
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10'
      },
      headers: {
        'x-rapidapi-key': 'aa71a3486emsh76f2ce83cd8a069p112dedjsnf21196b27da4',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
      }
    };

   try {
    const response = await axios.request(options);
    setProfileData(response.data);
    setLoading(false)
   } catch (error) {
    setError(error)
    setLoading(false)
   }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <ProfileContext.Provider value={{profileData,loading,error,getProfileData}}>{children}</ProfileContext.Provider>
  );
};

export {ProfileContext, ProfileProvider};
