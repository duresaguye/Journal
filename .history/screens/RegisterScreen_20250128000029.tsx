import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import tailwind from 'tailwind-rn';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registered
        const user = userCredential.user;
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <View style={tailwind('flex-1 p-4 bg-white')}>
      <Text style={tailwind('text-2xl mb-4')}>Register</Text>
      <TextInput
        style={tailwind('h-10 border border-gray-300 mb-4 p-2')}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={tailwind('h-10 border border-gray-300 mb-4 p-2')}
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
