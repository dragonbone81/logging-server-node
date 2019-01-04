# logging-server-node


### Front-end and Back-end for a logging server. 
  - Backend written in NodeJS and Express with mongoDB to produce a REST API.
  - Has a user model with JWT and hashed passwords.
  - Stores a date and a method for the log in the database.
  - Front-end written in React with a custom written router and uses JWT for API requests.
  - Displays all your current logs and able to add a new logs.
  - Automatically formats times (1/1/2019 738pm => 2019-1-1 19:38:00) to store in DB.

### Website: https://dragonbone81-logging-client.netlify.com/new_log
### Back-end REST API: https://dragonbone81-logging-server.now.sh/logs
