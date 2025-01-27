// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';



interface LoginScreenProps {
    navigation: NativeStackNavigationProp<any>;
  }
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: firebase.auth.UserCredential) => {
        // Signed in
        const user: firebase.User = userCredential.user;
        navigation.navigate('Home');
      })
      .catch((error: firebase.auth.Error) => {
        const errorCode: string = error.code;
        const errorMessage: string = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl mb-4">Login</Text>
      <TextInput
        className="h-10 border border-gray-400 mb-4 p-2"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="h-10 border border-gray-400 mb-4 p-2"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;