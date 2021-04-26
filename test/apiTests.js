const request = require("supertest");
const app = require("../app");

//getting all the users
describe("GET /users", () => {
  //Mocha
  it("request sends a list of all users", (done) => {
    //Mocha
    request(app) //Needs the HTTP server
      .get("/users") //Already is root so we specify the endpoing
      .set("Accept", "application/json") //HTTP header attributes
      .expect("Content-Type", /json/) //Check for header value
      .expect(200, done); //check for body value
  });
});

describe("GET /users/:id", () => {
  it("request sends a specific user", (done) => {
    request(app)
      .get("/users/001") //dummy id implemented in users router
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  it("request sends 404 when sent a non existing user", (done) => {
    request(app)
      .get("/users/002")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect('"user not found"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /users", () => {
  it("responds with a 201 after creation of new user", (done) => {
    let newUser = {
      id: "1",
      name: "Jimmy",
      surname: "Dummy",
      phone: "555-555-555",
    };
    request(app)
      .post("/users")
      .send(newUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
  it("responds with 400 if the format is not correct", (done) => {
    let newUser = {
      id: "1",
      //missing name
      surname: "Dummy",
      phone: "555-555-555",
    };
    request(app)
      .post("/users")
      .send(newUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('"could not add user"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
