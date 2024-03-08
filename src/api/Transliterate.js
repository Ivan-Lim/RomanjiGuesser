const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
export default class Transliterate {
    transliterate() {
        let key = "b22e0a6fd97e4306a63cf9db2c4cc4fc";
        let endpoint = "https://api.cognitive.microsofttranslator.com";
        
        // location, also known as region.
        // required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
        let location = "westus";
        
        axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                 // location required if you're using a multi-service or regional (not global) resource.
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': 'en',
                'to': 'fr,zu'
            },
            data: [{
                'text': 'I would really like to drive your car around the block a few times!'
            }],
            responseType: 'json'
        }).then(function(response){
            console.log(JSON.stringify(response.data, null, 4));
        })
        
    }
    
}
