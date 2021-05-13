import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { Container, Header, Content, Button } from 'native-base';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/LoginScreen.tsx" /> */}
      <View style={styles.content}>
        <Image source={require('../assets/images/logo.png')} style={{ width: 280, height: 200 }} />
      </View>
      <View style={styles.buttonContainer}>
        <Button block info  style={styles.button}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </Button>
        <Button block primary style={{ ...styles.button, marginTop: 10 }}>
          <Text style={styles.buttonText}>Registrarse</Text>
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
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  button: {
    width: '90%',
  },
  buttonText: {
    width: '100%',
    // fontWeight: 'bold',
    fontSize:30,
    textAlign: 'center',
    fontFamily: 'Roboto-Black'
    // fontFamily: 'zocial'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
