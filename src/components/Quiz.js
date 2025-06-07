import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useTransliterate } from '../api/useTransliterate';
import styled from 'styled-components';
import { words } from '../constants/words';
const { translate, transliterate, synonyms } = useTransliterate();

const Quiz = () => {

	const [input, setInput] = useState('');
	const [romanjiTranslations, setRomanjiTranslations] = useState([]);
    const [correct, setCorrect] = useState(false);
    const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)])
    const [showAnswer, setShowAnswer] = useState(false)
    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + word.slice(1);
    }
	const translateText = async () => {
        const enSynonyms = await synonyms(word)
		const jpTranslations = await translate([word, ...enSynonyms])
		const enTranslation = await transliterate(jpTranslations)
		setRomanjiTranslations(enTranslation)
	}

    const submitGuess = () => {
        if(romanjiTranslations.includes(input.toLocaleLowerCase())){
            setCorrect(true)
        }
    }
    const nextWord = () => {
        setCorrect(false)
        setWord(words[Math.floor(Math.random() * words.length)])
        setInput('')
        setShowAnswer(false)
    }

    useEffect(() => {
        translateText()
    }, [word]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{capitalize(word)}</Text>
			<TextInput
				style={styles.input}
				onChangeText={setInput}
				value={input}
			/>
                <div className="button-row gap-8">
                    <StyledButton onClick={submitGuess}>Guess</StyledButton>
                    <StyledButton onClick={() => setShowAnswer(true)}>Show Answer</StyledButton>
                    <StyledButton onClick={nextWord}>Next</StyledButton>
                </div>
            {correct && <Text style={styles.title}>Correct!</Text>}
            {showAnswer && <Text style={styles.title}>{romanjiTranslations.join(', ')}</Text>}
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
        backgroundColor: 'rgba(255, 255, 255, 1)',
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
  margin-right: 10px;
  &:hover {
    background-color: #45a049; /* Darker green */
  }
`;

export default Quiz;