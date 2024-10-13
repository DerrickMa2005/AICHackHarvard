import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';


export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
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
  navBar: {
    backgroundColor: '#2E6F40',
    padding: 15,
  },
});