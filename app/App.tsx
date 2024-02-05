import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native'
import {generateTokenAsync} from './modules/expo-attest'
import {ExpoAttestError} from './modules/expo-attest/src/ExpoAttest.types'
import axios from 'axios'

const API_URL = 'http://192.168.1.10:3000/apple/deviceCheck'

export default function App() {
  const [token, setToken] = React.useState('Not yet generated')
  const [response, setResponse] = React.useState<number>()

  const onGeneratePress = async () => {
    setToken('Generating...')
    try {
      const token = await generateTokenAsync()
      setToken(token)
    } catch(e: any) {
      e = e as ExpoAttestError
      setToken(e.code)
    }
  }

  const onCheckPress = async () => {
    try {
      const res = await axios.post(API_URL, {
        device_token: token
      })
      setResponse(res.status)
    } catch(e) {
      setResponse(e.response.status)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Attestation POC</Text>
      <Text numberOfLines={3}>Token: {token}</Text>
      <Text>Status: {response}</Text>
      <Button title="Generate" onPress={onGeneratePress} />
      <Button title="Check" onPress={onCheckPress} />
      <Button title="Set fake token" onPress={() => setToken('1234567')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
