import React, { createContext, useState } from 'react';

// Create a context without implementation
const JournalContext = createContext();

const JournalProvider = ({ children }) => {
  // Commenting out the state and functionality for now
  // const [entries, setEntries] = useState([]);

  // const addEntry = (entry) => {
  //   setEntries([...entries, { id: entries.length.toString(), text: entry }]);
  // };

  return (
    <JournalContext.Provider value={{}}>
      {children}
    </JournalContext.Provider>
  );
};

export { JournalContext, JournalProvider };
