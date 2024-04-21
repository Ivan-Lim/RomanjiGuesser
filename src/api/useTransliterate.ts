import axios from 'axios';
import { useAxiosConfig } from './useAxiosConfig';
import Constants from 'expo-constants';
const { getAxiosConfig } = useAxiosConfig();
export function useTransliterate() {

    async function translate(words: Array<string>): Promise<Array<string>> {
        const config = getAxiosConfig()
        config.url = '/translate'
        config.params = {
            'api-version': '3.0',
            'from': 'en',
            'to': 'ja'
        }
        words.forEach(word => {
            config.data.push({
                'text': word,
            })
        });
        return await axios(config).then(response => {
            let translations = [];
            response.data.forEach(translation => {
                translations.push(translation.translations[0].text)
            })
            return translations
        }).catch(e => {
            return [];
        })
    }
    async function transliterate(words: Array<string>): Promise<Array<string>> {
        const config = getAxiosConfig()
        config.url ='/transliterate'
        config.params = {
            'api-version': '3.0',
            'language': 'ja',
            'fromScript': 'jpan',
            'toScript': 'Latn'
        }
        words.forEach(word => {
            config.data.push({
                'text': word,
                'script': 'jpan'
            })
        });
        return await axios(config).then(response => {
            let transliterations = [];
            response.data.forEach(transliteration => {
                transliterations.push(transliteration.text)
            })
            return transliterations
        })
    }

    async function synonyms(text: string): Promise<Array<string>> {
        const options = {
            method: 'GET',
            url: 'https://wordsapiv1.p.rapidapi.com/words/' + text + '/synonyms',
            headers: {
              'X-RapidAPI-Key': Constants.expoConfig.extra.wordsApiKey,
              'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
          };
          try {
              const response = await axios.request(options);
              return response.data.synonyms.slice(0, 10)
          } catch (error) {
              console.error(error);
          }
    }
    return {
        translate,
        transliterate,
        synonyms
    };
}