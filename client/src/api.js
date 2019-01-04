export default class API {
    static BASE_URL = 'https://dragonbone81-logging-server.now.sh/';
    static get_logs = async () => {
        let response = await fetch(API.BASE_URL + 'logs', {
            method: 'GET',
        })
        if (response.ok) {
            return response.json();
        } else {
            return null;
        }
    }
    static post_log = async (data) => {
        let response = await fetch(API.BASE_URL + 'add-new', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                log: data,
            })
        })
        if (response.ok) {
            return response.json();
        } else {
            return null;
        }
    }
}