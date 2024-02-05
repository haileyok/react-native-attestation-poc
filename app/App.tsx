import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native'
import {generateTokenAsync} from './modules/expo-attest'
import {ExpoAttestError} from './modules/expo-attest/src/ExpoAttest.types'

export default function App() {
  const [token, setToken] = React.useState('Not yet generated')

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

  return (
    <View style={styles.container}>
      <Text>Attestation POC</Text>
      <Text numberOfLines={3}>Token: {token}</Text>
      <Button title="Generate" onPress={onGeneratePress} />
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
