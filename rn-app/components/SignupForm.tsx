import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button, } from '@rneui/base'
import axios from 'axios'
import { CREATE_USER, REQUEST_OTP } from '../utils/constants'

export default function SignupForm() {
  const [phone, setPhone] = useState('')

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\+[1-9]{1}[0-9]{3,14}$/

    return phoneRegex.test(phoneNumber)
  }

  const createUserAndRequestOtp = async (phoneNumber: string) => {
    try {
      await axios.post(CREATE_USER, { phone: phoneNumber })
      await axios.post(REQUEST_OTP, { phone: phoneNumber })
    } catch (err) {
      console.error('Error in submitting phone number:', err)
    }
  }

  const handleSubmit = async () => {
    if (!isValidPhoneNumber(phone)) {
      console.log('Invalid phone number')
      return; // Exit if the phone number is not valid
    }
    await createUserAndRequestOtp(phone); // Submit the phone number if it's valid
  }



  return (
    <View>
      <Input placeholder='+123456789' label={'Enter phone number'} value={phone} onChangeText={phone => setPhone(phone)} />
      <Button onPress={handleSubmit} title='Submit'>Sign Up</Button>
    </View>
  );
}