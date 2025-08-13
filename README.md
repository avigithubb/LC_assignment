## LC Assignment ##

* This is an assignment from LC corporation to build a simple URL shortner.

## Features and Technologies

* The website is built on using MERN stack, where,
* Node.js with Express.js is the backend.
* React.js is used in the frontend.
* MongoDB with mongoose is used as Database.

<i>The website consists some features:</i>

* The frontend cosists of a single conponent App.jsx which makes requests to backend for different queries.
* The backend consists two main routes <b>/shorten</b> and <b>/show</b>.
* "/shorten" route handle the POST request coming from the form and utilizes an API "spoo.me" to shorten the long url.
* "/show" route handles the GET request from frontend, when we click on the shorten url, it fetches the original url from the database and send back to the fronend to navigate into.
* The database is mongoDB in which the original url as well as the shorten url is being stored along with date at which it stored.
* The database uses one Model named <b>URLs</b> where we store the data.

## Steps to Reproduce

* clone the repository.
```
git clone repository url
```

* cd into main folder.
```
cd LC_assignment
```

* install dependencies.
```
npm install
```

* make sure you have MongoDB installed and up and running(Admin access required).
```
net start MongoDB
```

* Run the app.
```
npm run dev
```

*The website uses concorrency as the module to link frontend to the backend, and hence can be defined as the monolithic structure.*
### Paste the url and hit shorten.
