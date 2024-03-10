const { v4: uuidv4 } = require('uuid');
import Constants from 'expo-constants';
export function useAxiosConfig() {

    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const key = Constants.expoConfig.extra.apiKey;
    const location = "westus";

    function getAxiosConfig() {
        return {
            baseURL: endpoint,
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            url: null,
            params: null,
            data: null
        }
    }
    return {
        getAxiosConfig
    }
}