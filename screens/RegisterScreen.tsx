import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebaseConfig';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Commented out the registration logic
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Registered
    //     const user = userCredential.user;
    //     navigation.navigate('Home');
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.error(errorCode, errorMessage);
    //   });

    // For now, just navigate to the Home screen
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl mb-4">Register</Text>
      <TextInput
        className="h-10 border border-gray-300 mb-4 p-2"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="h-10 border border-gray-300 mb-4 p-2"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;
