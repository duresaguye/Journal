import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Define the interface first
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  image: string | null;
  date: Date;
}

// 2. Define context type
interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (entry: JournalEntry) => Promise<void>;
}

// 3. Create typed context
const JournalContext = createContext<JournalContextType>({
  entries: [],
  addEntry: async () => {},
});

// 4. Type the provider props
interface JournalProviderProps {
  children: ReactNode;
}

const JournalProvider = ({ children }: JournalProviderProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const storedEntries = await AsyncStorage.getItem('journalEntries');
        if (storedEntries) {
          // Convert ISO date strings back to Date objects
          const parsedEntries = JSON.parse(storedEntries, (key, value) => {
            return key === 'date' ? new Date(value) : value;
          });
          setEntries(parsedEntries);
        }
      } catch (error) {
        console.error('Failed to load journal entries', error);
      }
    };

    loadEntries();
  }, []);

  const addEntry = async (entry: JournalEntry) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
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