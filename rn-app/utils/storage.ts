import * as Keychain from 'react-native-keychain'

export const storeToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('userToken', token)
  }
  catch (err) {
    console.log('Error storing the token', err)
  }
}

export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword()
    if (credentials) {
      return credentials.password
    }

    return null
  }
  catch (err) {
    console.log('Error getting the token', err)
  }
}

export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword()
  }
  catch (err) {
    console.log('Error removing the token', err)
  }
}