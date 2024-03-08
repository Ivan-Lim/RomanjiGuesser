import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    let key = "b22e0a6fd97e4306a63cf9db2c4cc4fc";
    let endpoint = "https://api.cognitive.microsofttranslator.com";
    let location = "westus";
    
    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': 'en',
            'to': 'ja'
        },
        data: [{
            'text': email,
        }],
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
        console.log(response.data[0].translations[0].text)
        axios({
          baseURL: endpoint,
          url: '/transliterate',
          method: 'post',
          headers: {
              'Ocp-Apim-Subscription-Key': key,
               // location required if you're using a multi-service or regional (not global) resource.
              'Ocp-Apim-Subscription-Region': location,
              'Content-Length': 200,
              'Content-type': 'application/json',
              'X-ClientTraceId': uuidv4().toString()
          },
          params: {
              'api-version': '3.0',
              'language': 'ja',
              'fromScript': 'jpan',
              'toScript': 'Latn'
          },
          data: [{
              'text': response.data[0].translations[0].text,
              'script': 'jpan'
          }],
          responseType: 'json'
      }).then(function(response){
          console.log(JSON.stringify(response.data, null, 4));
          
      })
    })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Login;