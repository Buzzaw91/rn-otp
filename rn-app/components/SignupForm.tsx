import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button, } from '@rneui/base';

export default function SignupForm() {
  return (
    <View>
      <Input label={'Enter phone number'} />
      <Button title='Submit'>Sign Up</Button>
    </View>
  );
}