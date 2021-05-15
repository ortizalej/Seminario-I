import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Text, Button as NativeButton } from 'react-native';
import { View } from '../components/Themed';
import { Button, Form, Item, Input } from 'native-base';
// import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import globalStyles from '../styles/global';
import * as Google from 'expo-google-app-auth';

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <View style={[styles.content, {}]}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{ width: 280, height: 200, marginBottom: -20 }}
        />
        <Text style={styles.title}>Ingresá tus datos</Text>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
         testID='formLogin'
          style={{
            flex: 3,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Form>
            <Item
              inlineLabel
              last
              style={[globalStyles.input, { width: '80%' }]}
            >
              <Input
                placeholder='Email'
                style={{ width: '100%' }}
                onChangeText={(texto) => setEmail(texto)}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                secureTextEntry={true}
                placeholder='Contraseña'
                onChangeText={(texto) => setPassword(texto)}
              />
            </Item>
          </Form>
        </View>
        <View
            testID='button-Container'
            style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            <View style={styles.buttonContainer}>
                <Button
                    block
                    primary
                    style={[globalStyles.button]}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={globalStyles.buttonText}>Registrarme</Text>
                </Button>
                <Button
                    block
                    primary
                    style={[globalStyles.button]}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={globalStyles.buttonText}>Volver</Text>
                </Button>
            </View>
        </View>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#656771',
    marginBottom: 12,
    marginTop: 0,
  },
  buttonContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    width: '80%',
  },
  button: {
    width: '90%',
    backgroundColor: '#5985EB',
    textAlign: 'center',
  },
  buttonText: {
    width: '100%',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    // marginBottom: 20,
  },
  checkbox: {
    // alignSelf: 'center',
  },
  checkboxLabel: {
    margin: 8,
    color: '#656771',
  },
});
