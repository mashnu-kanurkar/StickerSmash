import { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import Button from '@/components/Button';

const CleverTap = require('clevertap-react-native');

export default function Index() {
  
  const [email, setEmail] = useState('');
  const [identity, setidentity] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if(validateEmail(email)){
      alert(`Logging in with email: ${email}`);
      CleverTap.onUserLogin({
        Name: 'Name',
        Identity: identity,
        Email: email,
        custom1: 123,
        birthdate: new Date('1992-12-22T06:35:31'),
      });
    }else{
      alert(`Please enter valid email: ${email}`);
    }
    
  };

  const handleSendEvent = () => {
    alert('Event sent');
    CleverTap.recordEvent('testEvent');
    CleverTap.recordEvent('Send Basic Push');
    CleverTap.recordEvent('testEventWithProps', {start: new Date(), foo: 'bar'});
  };

  CleverTap.setDebugLevel(3);
  CleverTap.initializeInbox();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Identity"
        placeholderTextColor="#888"
        value={identity}
        onChangeText={setidentity}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.footerContainer}>
        <Button label="Login" theme="primary" onPress={handleLogin} />
        <Button label="Send Event" theme="primary" onPress={handleSendEvent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
});
