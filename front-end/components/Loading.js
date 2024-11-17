import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loading = ({ message = "Wow! So many fun things are coming! Hold tight!" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF4500" style={styles.spinner} />
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subMessage}>Just a little longer to start the adventure!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0E1',
  },
  spinner: {
    transform: [{ scale: 1.8 }],
  },
  message: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF4500',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  subMessage: {
    marginTop: 15,
    fontSize: 20,
    color: '#FF4500',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Loading;