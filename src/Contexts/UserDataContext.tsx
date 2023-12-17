import { createContext, useState } from 'react';

export const UserDataContext = createContext(null);

export function UserDataProvider({ children }) {
  const [obsServerAddress, setObsServerAddress] = useState('192.168.0.1');
  const [obsServerPort, setObsServerPort] = useState(4455);
  const [obsServerPassword, setObsServerPassword] = useState('');

  return (
    <UserDataContext.Provider
      value={{
        obsServerAddress,
        setObsServerAddress,
        obsServerPort,
        setObsServerPort,
        obsServerPassword,
        setObsServerPassword,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
