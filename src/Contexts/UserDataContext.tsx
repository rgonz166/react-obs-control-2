import { createContext, useState } from 'react';
import { IUserDataProvider } from '../Interfaces/IUserData';

export const UserDataContext = createContext<IUserDataProvider>(null);

export function UserDataProvider({ children }) {
  const [obsServerAddress, setObsServerAddress] = useState<string>(() => {
    const saved = localStorage.getItem('obsServerAddress');
    const initialValue = JSON.parse(saved);
    return initialValue || '192.168.0.1';
  });
  const [obsServerPort, setObsServerPort] = useState<number>(() => {
    const saved = localStorage.getItem('obsServerPort');
    const initialValue = JSON.parse(saved);
    return initialValue || 4455;
  });
  const [obsServerPassword, setObsServerPassword] = useState<string>(() => {
    const saved = localStorage.getItem('obsServerPassword');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  });

  const [twitchToken, setTwitchToken] = useState(() => {
    const saved = localStorage.getItem('twitchToken');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  });

  const handleServerAddress = (data: string) => {
    setObsServerAddress(data);
    localStorage.setItem('obsServerAddress', JSON.stringify(data));
  };

  const handleServerPort = (data: number) => {
    setObsServerPort(data);
    localStorage.setItem('obsServerPort', JSON.stringify(data));
  };

  const handleServerPassword = (data: string) => {
    setObsServerPassword(data);
    localStorage.setItem('obsServerPassword', JSON.stringify(data));
  };

  return (
    <UserDataContext.Provider
      value={{
        obsServerAddress,
        handleServerAddress,
        obsServerPort,
        handleServerPort,
        obsServerPassword,
        handleServerPassword,
        twitchToken,
        setTwitchToken,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
