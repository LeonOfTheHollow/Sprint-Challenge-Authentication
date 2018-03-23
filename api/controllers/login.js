const jwt = require("jsonwebtoken");
const { mysecret } = require("../../config");
const User = require("../models/userModels");

// const login = async function(req, res) {
//   const { username, password } = req.body;
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       res.status(403).json({ error: "Invalid Username/Password" });
//       return;
//     }
//     if (user === null) {
//       res.status(422).json({ error: "No user with that username in our DB" });
//       return;
//     }
//     user.checkPassword(password, (nonMatch, hashMatch) => {
//       // This is an example of using our User.method from our model.
//       if (nonMatch !== null) {
//         res.status(422).json({ error: "passwords dont match" });
//         return;
//       }
//       if (hashMatch) {
//         const payload = {
//           username: user.username
//         }; // what will determine our payload.
//         const token = jwt.sign(payload, mysecret); // creates our JWT with a secret and a payload and a hash.
//         res.json({ token }); // sends the token back to the client
//       }
//     });
//   });
// };

const login = async function(req, res) {
  const { username, password } = req.body;
  const formattedUsername = username.toLowerCase();
  console.log(formattedUsername);
  try {
    const user = await User.findOne({ username: formattedUsername });
    if (user === null) {
      res.status(422).json({ error: "No user with that username in our DB" });
      return;
    }
    const userIsValidated = await user.checkPassword(password);
    if (userIsValidated) {
      const payload = { username: user.username };
      const token = jwt.sign(payload, mysecret);
      res.json({ token });
    } else {
      res.status(422).json({ error: "Invalid Password!" });
    }
  } catch (err) {
    res.status(403).json({ error: "Invalid Username/Password" });
  }
};

module.exports = {
  login
};
