import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UIBallAnimation from '../ballAnimation/ballAnimation';
import axios from 'axios';
import {BASE_API_URL} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [isLoginClicked, setIsLoginClicked] = useState(false);

    const navigation = useNavigation();

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.navigate("Bedroom");
    //         }
    //     });
    //     return unsubscribe;
    // }, []);

    const handleSignup = () => {
        navigation.navigate('SignUp');
    };

    const handleLogin = () => {
        console.log(email, pin);
        console.log(`${BASE_API_URL}/users/sign-in`)
        setIsLoginClicked(true);
        axios.post(`${BASE_API_URL}/users/sign-in`, {email, pin}).then(response => {
            if (response.status === 200) {
                AsyncStorage.setItem('userId', response.data.userId);
                console.log("Logged in with user", response.data.userEmail);
                navigation.navigate('Bedroom');  
            } else {
                alert(response.data.message);  
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while logging in');
        })
        .finally(() => setIsLoginClicked(false));  
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.ballAnimationContainer}>
                <UIBallAnimation />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Pin:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your pin"
                        secureTextEntry
                        value={pin}
                        onChangeText={text => setPin(text)}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                    disabled={isLoginClicked} 
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignup}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ballAnimationContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    inputContainer: {
        width: '50%',
        marginTop: 200,
    },
    inputRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    },
    label: {
        marginRight: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 15,
        color: 'black',
        fontSize: 18,
        backgroundColor: 'white'
    },
    buttonContainer: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
    },
});

export default LoginScreen;
