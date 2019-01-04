export default class API {
    static BASE_URL = 'https://dragonbone81-logging-server.now.sh/';
    static get_logs = async () => {
        let response = await fetch(API.BASE_URL + 'logs', {
            method: 'GET',
        })
        console.log(response);
    }
}