import React, { createContext, useState } from 'react';

const JournalContext = createContext();

const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries([...entries, { id: entries.length.toString(), text: entry }]);
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry }}>
      {children}
    </JournalContext.Provider>
  );
};

export { JournalContext, JournalProvider };