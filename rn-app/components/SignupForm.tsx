import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button, } from '@rneui/base';
import axios from 'axios';
import { CREATE_USER, REQUEST_OTP } from '../utils/constants';

export default function SignupForm() {
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(CREATE_USER, { phone })
      await axios.post(REQUEST_OTP, { phone })
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <View>
      <Input label={'Enter phone number'} value={phone} onChangeText={phone => setPhone(phone)} />
      <Button onPress={handleSubmit} title='Submit'>Sign Up</Button>
    </View>
  );
}