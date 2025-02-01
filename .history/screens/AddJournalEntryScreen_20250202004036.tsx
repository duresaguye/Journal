import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { JournalContext } from "../context/JournalContext";

interface AddJournalEntryScreenProps {
  navigation: any;
}

const AddJournalEntryScreen: React.FC<AddJournalEntryScreenProps> = ({
  navigation,
}) => {
  const [entry, setEntry] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { addEntry } = useContext(JournalContext);

  const handleSave = () => {
    const newEntry = {
      id: Date.now().toString(),
      title: "New Entry",
      content: entry,
      image,
      date: new Date().toISOString(),
    };
    addEntry(newEntry);
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Corrected media type
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 px-6 py-8 bg-[#F9F8FD]">
      {/* Title */}
      <Text className="text-3xl font-bold text-[#333] mb-5">
        ✨ New Journal Entry
      </Text>

      {/* Writing Area */}
      <View className="bg-white p-4 rounded-2xl shadow-md">
        <TextInput
          className="text-lg text-gray-800 h-40"
          multiline
          numberOfLines={6}
          onChangeText={setEntry}
          value={entry}
          placeholder="Write something meaningful..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Upload Image */}
      <TouchableOpacity
        onPress={pickImage}
        className="bg-indigo-600 py-4 rounded-xl mt-6 shadow-md active:bg-indigo-700"
      >
        <Text className="text-white text-lg text-center font-semibold">
          📸 Upload Image
        </Text>
      </TouchableOpacity>

      {/* Show Uploaded Image */}
      {image && (
        <Image
          source={{ uri: image }}
          className="w-48 h-48 mt-5 rounded-lg shadow-lg"
          resizeMode="cover"
        />
      )}

      {/* Save Entry */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-green-500 py-4 rounded-xl mt-6 shadow-md active:bg-green-600"
      >
        <Text className="text-white text-lg text-center font-semibold">
          ✅ Save Entry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddJournalEntryScreen;
