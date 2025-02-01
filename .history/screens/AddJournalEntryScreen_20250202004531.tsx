import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { JournalContext } from "../context/JournalContext";

interface AddJournalEntryScreenProps {
  navigation: any;
}

const AddJournalEntryScreen: React.FC<AddJournalEntryScreenProps> = ({ navigation }) => {
  const [entry, setEntry] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { addEntry } = useContext(JournalContext);

  const handleSave = () => {
    addEntry({
      id: Date.now().toString(),
      title: "Untitled Entry",
      content: entry,
      image,
      date: new Date().toISOString(),
    });
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [`MediaType`],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 px-5 bg-slate-50">
      {/* Header */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-slate-800">New Reflection</Text>
        <Text className="text-slate-500 mt-1">Capture today's memories</Text>
      </View>

      {/* Writing Canvas */}
      <View className="flex-1 space-y-6">
        <View className="bg-white rounded-xl p-5 shadow-sm">
          <TextInput
            className="text-lg text-slate-800 h-48"
            multiline
            placeholder="Start writing your thoughts..."
            placeholderTextColor="#94a3b8"
            onChangeText={setEntry}
            value={entry}
          />
        </View>

        {/* Media Section */}
        <View className="space-y-4">
          <TouchableOpacity 
            onPress={pickImage}
            className="bg-indigo-100 p-4 rounded-xl items-center"
          >
            <Text className="text-indigo-600 font-medium">🖼️ Add Photo</Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image }}
              className="w-full h-48 rounded-xl"
              resizeMode="cover"
            />
          )}
        </View>

        {/* Action Bar */}
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-1 bg-slate-200 p-4 rounded-xl"
          >
            <Text className="text-center text-slate-600">Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleSave}
            className="flex-1 bg-indigo-600 p-4 rounded-xl"
            disabled={!entry.trim()}
          >
            <Text className="text-center text-white font-medium">Save Entry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddJournalEntryScreen;