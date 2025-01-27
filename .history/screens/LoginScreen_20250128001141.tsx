import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
// import { signInWithEmailAndPassword, UserCredential, AuthError } from 'firebase/auth';
// import { auth } from '../firebaseConfig';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Commented out the authentication logic
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential: UserCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     navigation.navigate('Home');
    //   })
    //   .catch((error: AuthError) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.error(errorCode, errorMessage);
    //   });

    // For now, just navigate to the Home screen
    navigation.navigate('Home');
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
