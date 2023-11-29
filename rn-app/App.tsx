import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from 'firebase/app';
import SignupForm from './components/SignupForm';
import SignInForm from './components/SignInForm';

const config = {
  apiKey: 'placeholder',
  authDomain: 'rn-otp-c47ee.firebaseapp.com',
  messagingSenderId: '789121811901',
  projectId: 'rn-otp-c47ee',
  appId: 'rn-otp',
  storageBucket: 'rn-otp-c47ee.appspot.com',
}

const initializeFirebase = () => {
  console.log(config.apiKey)
  if (getApps().length === 0) {
    initializeApp(config);
  }
};


export default function App() {
  initializeFirebase()
  return (
    <View style={styles.container}>
      {/* <SignupForm /> */}
      <SignInForm />
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
