const fetch = require('node-fetch');

const getAllJokes = async function(req, res) {
  if (req.decoded) {
    try {
      const encodedResponse = await fetch('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten');
      const jokes = await encodedResponse.json();
      res.json(jokes);
    } catch(err) {
      res.status(500).json({ error: 'There was an error' });
    }
  } else {
    return res.status(422).json({ error: `Can't get these jokes!` });
  }
};

// const getAllJokes = (req, res) => {
//   if (req.decoded) {
//     fetch(
//       'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
//     )
//       .then(p => p.json())
//       .then(jokes => res.json(jokes))
//       .catch(err => res.status(500).json({ error: 'Error Fetching Jokes' }));
//   } else {
//     return res.status(422).json({ error: `Can't get these jokes!` });
//   }
// };

module.exports = {
  getAllJokes
};
