import React, { createContext, useState } from 'react';

export const MediaStreamContext = createContext();

export const MediaStreamProvider = ({ children }) => {
  const [stream, setStream] = useState(null);

  return (
    <MediaStreamContext.Provider value={{ stream, setStream }}>
      {children}
    </MediaStreamContext.Provider>
  );
};
