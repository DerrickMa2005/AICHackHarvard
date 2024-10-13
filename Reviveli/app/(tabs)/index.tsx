import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';


export default function Index() {
  return (
    <View>
      <Text style={styles.text}></Text>
      <Text style={styles.container}>Welcome to Reviveli!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#90D5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
});