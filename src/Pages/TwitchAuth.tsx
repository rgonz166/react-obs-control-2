import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../Contexts/UserDataContext';
import { useLocation, useNavigate } from 'react-router-dom';

function TwitchAuth() {
  const { twitchToken, setTwitchToken } = useContext(UserDataContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { hash } = useLocation();
  const location = useLocation();
  useEffect(() => {
    getParams();
  });

  useEffect(() => {
    console.log('token', twitchToken);
    if (error) {
      // localStorage.setItem('twitchToken', JSON.stringify(null));
      navigate('/Settings');
    } else if (!error && twitchToken && twitchToken !== undefined) {
      // localStorage.setItem('twitchToken', JSON.stringify(token));
      navigate('/Settings');
    }
  }, [twitchToken, error, navigate]);

  const getParams = () => {
    const isError = new URLSearchParams(location.search).get('error');
    if (isError === 'access_denied') {
      setError(true);
      setTwitchToken('');
    } else {
      setError(false);
      const currentToken = hash.split('&')[0].split('=')[1];
      console.log('currentToken', currentToken);
      setTwitchToken(currentToken);
      localStorage.setItem('twitchToken', JSON.stringify(currentToken));
    }
  };

  return (
    <div>
      <h3>ID: {twitchToken}</h3>
      <button onClick={() => getParams()}>Click</button>
    </div>
  );
}

export default TwitchAuth;
