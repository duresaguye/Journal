import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { summarizeText, analyzeSentiment } from '../api/openaiApi';  // Import the API functions

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
    // Analyze sentiment and summarize the entry
    const sentiment = await analyzeSentiment(entryContent); // Analyze mood
    const summarizedText = await summarizeText(entryContent); // Summarize the text

    const newEntry = {
      id: Date.now().toString(),
      title: entryTitle, // Title passed as argument
      content: entryContent,
      date: new Date().toISOString(),
      mood: sentiment, // Moods from AI
      summary: summarizedText, // Summary from AI
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
