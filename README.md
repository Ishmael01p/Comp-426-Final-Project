# Comp-423-Final-Project
### Jayson Mbugua, Kyran Taylor, Ishmael Percy
### Project Summary 
We created a linkedin Job board wrapper by using Rapid APIs Real Time Linkedin Scrapper API using React, Express.js, Node.js, and MongoDB to retrieve various results depending on keywords, GeoID(Location), salary, date posted, and other filters. In order to implement the session persistant state requirements we created two databases using MongoDB, one for users and another for the passwords that had a field referencing the users ID. This allowed us to give special access to users who registered and logged in by giving them the ability to save jobs which were stored in each users save job array in MongoDB. Allowing users to select and unselect whatever job they wanted to, and giving them the ability to access these saved jobs by selecting the saved job page then clicking load saved jobs. Outside of the rapidAPI api we also used 5 restful apis post users usernames and passwords to the databases, 2 more to handle posting and deleting saved jobs from each users saved job array, another 1 more to get a users saved jobs.
### Running React + Authentication with Node JS :
    Run the following command in terminal:
    - "cd server" # if needed
    - "npm install" # install dependencies
    - "node server.mjs"
    Run the following command in a seperate terminal simultaneously:
    - "cd react-app"
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
