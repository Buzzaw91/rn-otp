import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button, } from '@rneui/base'
import axios from 'axios'
import auth from 'firebase/auth';
import 'firebase/auth';

import { VERIFY_OTP } from '../utils'

export default function SignInForm() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const signInWithToken = async (customToken: string) => {
    try {
      // Get the Auth instance
      const authInstance = auth.getAuth();
      // Sign in with the custom token
      const userCredential = await auth.signInWithCustomToken(authInstance, customToken);
      // userCredential contains information about the signed-in user
      console.log(userCredential.user);
    } catch (error) {
      console.error('Error signing in with custom token:', error);
    }
  };


  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(VERIFY_OTP, { phone, code })
      console.log(data)
      await signInWithToken(data.token)

    } catch (err) {
      console.error('Error in submitting phone number:', err)
    }
  }

  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <Input label='Enter Phone Number' value={phone} onChangeText={phone => setPhone(phone)} />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Input label='Enter Code' value={code} onChangeText={code => setCode(code)} />
      </View>

      <Button title='Submit' onPress={handleSubmit} >Sign In</Button>
    </View>
  )
}