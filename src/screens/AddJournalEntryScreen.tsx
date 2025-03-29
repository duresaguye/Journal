import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { JournalContext } from "../context/JournalContext";
import moment from "moment";

interface AddJournalEntryScreenProps {
  navigation: any;
}

const AddJournalEntryScreen: React.FC<AddJournalEntryScreenProps> = ({ navigation }) => {
  const [entry, setEntry] = useState("");
  const { addEntry } = useContext(JournalContext);
  const currentDate = moment().format("MMMM D, YYYY");

  const handleSave = async () => {
    if (!entry.trim()) return;

    // Call the addEntry method from context, passing content and title
    await addEntry(entry, currentDate);  // Add the entry along with the title as date

    navigation.goBack();
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#F5F5F5]" // Light background color
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-between px-6 py-4">
          {/* Journal Input */}
          <TextInput
            className="text-lg text-gray-800 h-48 border-b border-gray-300 pb-4 mb-6"
            multiline
            placeholder="Write something meaningful..."
            placeholderTextColor="#A3A3A3"
            onChangeText={setEntry}
            value={entry}
          />

          {/* Bottom Button Container */}
          <View className="flex-row justify-between mb-6">
            {/* Cancel Button */}
            <TouchableOpacity onPress={handleBackPress} className="p-2">
              <Text className="text-lg font-semibold text-gray-700">Cancel</Text>
            </TouchableOpacity>
            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSave}
              className={`p-3 px-6 rounded-full ${entry.trim() ? "bg-[#040229]" : "bg-[#B0BEC5]"}`}
              disabled={!entry.trim()}
            >
              <Text className="text-white font-semibold text-lg">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddJournalEntryScreen;