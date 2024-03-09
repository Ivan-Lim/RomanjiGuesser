import axios from 'axios';
import Constants from 'expo-constants';
const { v4: uuidv4 } = require('uuid');
export function useTransliterate() {
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const key = Constants.manifest.extra.apiKey;
    const location = "westus";

    async function transliterate(text: string): Promise<string> {
        return await axios({
            baseURL: endpoint,
            url: '/transliterate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
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
                'text': text,
                'script': 'jpan'
            }],
            responseType: 'json'
        }).then(function(response){
            return response.data[0].text
        })
    }

    async function translate(text: string): Promise<string> {
        return await axios({
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
                'text': text,
            }],
            responseType: 'json'
        }).then(function(response){
            return response.data[0].translations[0].text
        })
    }
    return {
        transliterate,
        translate
    };
}