import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from '../components/Themed';
import { Container, Header, Content, Button } from 'native-base';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>HOME SCREEN</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  button: {
    width: '90%',
    backgroundColor: '#5985EB',
    textAlign: 'center'
  },
  buttonText: {
    width: '100%',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#656771'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
