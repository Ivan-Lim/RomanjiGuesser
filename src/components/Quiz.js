import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTransliterate } from '../api/useTransliterate';
const {translate, transliterate} = useTransliterate();

const Quiz = () => {
  const [input, setInput] = useState('');
  const [romanjiTranslation, setRomanjiTranslation] = useState('');

  const translateText = async () => {
	const jpTranslation = await translate(input)
	const enTranslation = await transliterate(jpTranslation)
	setRomanjiTranslation(enTranslation)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Romanization</Text>
      <TextInput
        style={styles.input}
        placeholder="Text"
        onChangeText={setInput}
        value={input}
        autoCapitalize="none"
      />
	<p>
		{romanjiTranslation}
	</p>
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