import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JournalContext = createContext();

const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const storedEntries = await AsyncStorage.getItem('journalEntries');
        if (storedEntries) {
          setEntries(JSON.parse(storedEntries));
        }
      } catch (error) {
        console.error('Failed to load journal entries', error);
      }
    };

    loadEntries();
  }, []);

  const addEntry = async (entryContent, entryTitle) => {
    const newEntry = {
      id: Date.now().toString(),
      title: entryTitle, // Title passed as argument
      content: entryContent,
      date: new Date().toISOString(),
    };

    const newEntries = [...entries, newEntry];
    setEntries(newEntries);

    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
    } catch (error) {
      console.error('Failed to save journal entry', error);
    }
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry }}>
      {children}
    </JournalContext.Provider>
  );
};

export { JournalContext, JournalProvider };