export default class API {
  static BASE_URL = "https://dragonbone81-logging-server.now.sh/";
  static get_logs = async () => {
    let response = await fetch(API.BASE_URL + "logs", {
      method: "GET"
    });
    if (response.ok) {
      return (await response.json()).logs;
    } else {
      return null;
    }
  };
  static post_log = async data => {
    let response = await fetch(API.BASE_URL + "add-log", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        log: data
      })
    });
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  };
  static delete_log = async id => {
    let response = await fetch(API.BASE_URL + "delete-log", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        id
      })
    });
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  };
  static register = async user => {
    let response = await fetch(API.BASE_URL + "register", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        user
      })
    });
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  };
  static login = async user => {
    let response = await fetch(API.BASE_URL + "login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        user
      })
    });
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  };
}
