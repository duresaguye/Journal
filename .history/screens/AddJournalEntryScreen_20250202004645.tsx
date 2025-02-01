import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { JournalContext } from '../context/JournalContext';

interface AddJournalEntryScreenProps {
  navigation: any;
}

const AddJournalEntryScreen: React.FC<AddJournalEntryScreenProps> = ({ navigation }) => {
  const [entry, setEntry] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { addEntry } = useContext(JournalContext);

  const handleSave = () => {
    const newEntry = {
      id: Date.now().toString(),
      title: 'New Entry',
      content: entry,
      image,
      date: new Date().toISOString(), // Convert Date to string
    };
    addEntry(newEntry);
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use the correct enum value
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Journal Entry</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        onChangeText={setEntry}
        value={entry}
        placeholder="Write your journal entry here..."
      />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    textAlignVertical: 'top',
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});

export default AddJournalEntryScreen;