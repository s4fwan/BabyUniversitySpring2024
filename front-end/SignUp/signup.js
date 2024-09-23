import React, { useState } from 'react';
import axios from 'axios';
import {BASE_API_URL} from "@env"
import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import phyDoodleShapes from '../assets/BgImage/doodle.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateName = (name) => /^[A-Za-z]+$/.test(name);
const validatePin = (pin) => /^\d{4}$/.test(pin);

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();
  
const handleSignup = async () => {
  const newErrors = {};

  if (!email) newErrors.email = 'Please enter your email.';
  else if (!validateEmail(email)) newErrors.email = 'Invalid email format.';

  if (!name) newErrors.name = 'Please enter your name.';
  else if (!validateName(name)) newErrors.name = 'Name must only contain letters.';

  if (!pin) newErrors.pin = 'Please enter a four-digit pin.';
  else if (!validatePin(pin)) newErrors.pin = 'Please enter a valid four-digit pin.';

  setErrors(newErrors);
  console.log(newErrors)
  if (Object.keys(newErrors).length === 0) {
    try {
      const requestUrl = `${BASE_API_URL}/users/sign-up`;
      const requestBody = { email, pin, username: name };
      console.log(requestBody);
      const response = await axios.post(requestUrl, requestBody);
      await AsyncStorage.setItem('userId', response.data.userId);
      navigation.replace('Bedroom'); 
    } catch (error) {
      setErrors({ general: error.message });
    }
  }
};
return (
    
  <ScrollView contentContainerStyle={styles.scrollContainer}>
     <Image source={phyDoodleShapes} style={styles.backgroundImage} />
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <Text style={styles.header}>Baby University Sign up page</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={name}
            onChangeText={text => setName(text)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Pin:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a four digit pin"
            secureTextEntry
            value={pin}
            onChangeText={text => setPin(text)}
          />
          {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('Login')}>
<Text style={styles.goBackText}>Go Back</Text>
</TouchableOpacity>

    </KeyboardAvoidingView>
  </ScrollView>
);
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    marginTop: 0,
    marginBottom: -320,
  },
  header: {
    fontSize: 50,
    fontFamily: 'Itim_400Regular',
    color: '#3F3CB4',
    marginVertical: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  label: {
    marginRight: 10,
    fontWeight: 'bold',
    flex: 1,
  },
  input: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%',
  },
  button: {
    backgroundColor: '#3F3CB4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
    fontSize: 12,
  },
  goBackButton: {
    marginTop: 20,
  },
  goBackText: {
    color: '#3F3CB4',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default SignupScreen;