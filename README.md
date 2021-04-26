The purpose of this project is to learn the functionalities of "SuperTest" an API testing suite.

Doc available at [github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)

I've created a skeleton Express application using the "new" functionality offered by Express (Node 8.2.0 and after) :

```
npx express-generator
```

I have then installed the dependencies and installed superTest as devDependency:

```
npm install
npm install supertest --save-dev
```

The installation will include Mocha as well.

I added some routes to the users endpoint for testing purposes:

```javascript
var express = require("express");
var router = express.Router();

//get all users
router.get("/", function (req, res, next) {
  return res.json("all users received");
});
//get specific user
router.get("/:id", function (req, res, next) {
  if (req.params.id === "001") {
    return res.json("user 001");
  }
  return res.status(404).json("user not found");
});
//add user
router.post("/", function (req, res, next) {
  let content = req.body;
  if (content.id) {
    //just to demo
    return res.status(201).json("user added");
  }
  return res.status(400).json("could not add user");
});

module.exports = router;
```

I created a test folder at root level, with apiTests.js being the file where the tests will happen.

```
├── app.js
├── test
|   └── apiTests.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

Will be testing GET and POST functionality.

```
  GET /users
GET /users 200 3.121 ms - 20
    ✓ request sends a list of all users

  GET /users/:id
GET /users/001 200 0.576 ms - 10
    ✓ request sends a specific user
GET /users/002 404 0.493 ms - 16
    ✓ request sends 404 when sent a non existing user

  POST /users
POST /users 201 5.144 ms - 12
    ✓ responds with a 201 after creation of new user
POST /users 400 0.646 ms - 20
    ✓ responds with 400 if the format is not correct


  5 passing (40ms)
```
