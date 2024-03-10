import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useTransliterate } from '../api/useTransliterate';
import styled from 'styled-components';
const { translate, transliterate } = useTransliterate();

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
			/>
			<StyledButton onClick={translateText}>Translate</StyledButton>
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
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
        color: 'white'
	},
	input: {
		width: '80%',
		height: 40,
		borderColor: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
        color: 'black'
	},
});
const StyledButton = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049; /* Darker green */
  }
`;

export default Quiz;