import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from '../components/Themed';
import { Container, Header, Content, Button } from 'native-base';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/WelcomeScreen.tsx" /> */}
      <View style={styles.content}>
        <Image source={require('../assets/images/logo.png')} style={{ width: 280, height: 200 }} />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          block primary 
          style={{ ...styles.button}}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
