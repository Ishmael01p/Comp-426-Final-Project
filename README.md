# Comp-426-Final-Project
### Jayson Mbugua, Kyran Taylor, Ishmael Percy
### Youtube Link
https://www.youtube.com/watch?v=qLnEJS995WQ
### Project Summary 
We developed a LinkedIn Job Board Wrapper using RapidAPI's Real-Time LinkedIn Scraper API alongside React, Express.js, Node.js, and MongoDB. This project allows users to search for job postings based on keywords, location (GeoID), salary, posting date, and other filters. To implement session-persistent state, we designed two MongoDB databases: one to store user information and another for securely storing passwords, with a field linking passwords to their respective user IDs.

Registered users gain special access to save jobs, which are stored in a personalized "saved jobs" array within the database. Users can easily add or remove jobs from their saved list and access them later via the "Saved Jobs" page, where they can load and manage their selections. These features are not availible to users who select countinue as a guess which essential creates a user who is not in the database and does have the abiliy to save jobs. 

In addition to using the RapidAPI API, we implemented several RESTful APIs: five for user registration and login functionality, two for managing saved jobs (adding and removing), and one for retrieving saved jobs. If we had more time, the next that should be implemented in some security around around encrptying passwords potential with a JWT token route in order to prevent data leaks. 
### Running React + Vite Frontend with Node JS + Express JS Backend:
    Run the following command in terminal:
    - "cd server" # if needed
    - "npm install" # install dependencies
    - "node server.mjs"
    Run the following command in a seperate terminal simultaneously:
    - "cd react-app"
    - "npm install" # install dependencies
    - "npm run dev"
### API
- Job Post API:
    - https://rapidapi.com/rockapis-rockapis-default/api/linkedin-data-api/playground/apiendpoint_d6ee76ac-f060-468e-9e18-685375ea2004 
### FrameWorks and Libraries Used
- React
    - https://react.dev/
- Vite
    - https://vite.dev/ 
- react-router-dom (react package)
    - https://reactrouter.com/en/main/start/tutorial
- Mongoose + MongoDB
    - https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
- cors (node.js package)
    - https://www.npmjs.com/package/cors
- express (node.js framework)
    - https://expressjs.com/
