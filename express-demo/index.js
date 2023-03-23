const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

// app.get()
// app.post()
// app.put()
// app.delete()

/* Hello World API start */
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api", (req, res) => {
  res.send([1, 2, 3, 4, 5]);
});
/* Hello World API end */

/* Route single Parameter start */
app.get("/api/:id", (req, res) => {
  res.send(req.params.id);
});

/* Route multiple Parameters start */
// app.get("/api/:year/:month", (req, res) => {
//   res.send(req.params);
// });

/*Query Parameters */
// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.query);
// });

/*Handling GET Requests*/
const users = [
  { id: 1, user_name: "priyo" },
  { id: 2, user_name: "Mahmud" },
  { id: 3, user_name: "sanjid" },
  { id: 4, user_name: "shakil" },
];
app.get("/api", (req, res) => {
  res.send(users);
});
app.get("/api/users/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user with the given id was not Found");
  res.send(user);
});

/* POST request handling */

app.post("/api/users", (req, res) => {
  //input validation
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  console.log(result);

  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Name is required and should be minimum charecter 3.");
    return;
  }

  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.send(user);
});

//environment handling
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`This is port ${port}`));
