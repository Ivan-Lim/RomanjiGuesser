import axios from 'axios';
import { useAxiosConfig } from './useAxiosConfig';

const { getAxiosConfig } = useAxiosConfig();
export function useTransliterate() {

    async function translate(text: string): Promise<string> {
        const config = getAxiosConfig()
        config.url = '/translate'
        config.params = {
            'api-version': '3.0',
            'from': 'en',
            'to': 'ja'
        }
        config.data = [{
            'text': text,
        }]
        return await axios(config).then(response => {
            return response.data[0].translations[0].text
        })
    }
    async function transliterate(text: string): Promise<string> {
        const config = getAxiosConfig()
        config.url ='/transliterate'
        config.params = {
            'api-version': '3.0',
            'language': 'ja',
            'fromScript': 'jpan',
            'toScript': 'Latn'
        }
        config.data = [{
            'text': text,
            'script': 'jpan'
        }]
        return await axios(config).then(response => {
            return response.data[0].text
        })
    }


    return {
        translate,
        transliterate
    };
}