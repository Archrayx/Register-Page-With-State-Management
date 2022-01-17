const express = require('express');
const cors = require('cors');
const Twitter = require('twit');
const app = express();

app.listen(3000, () => console.log('Server running'))

const client = new Twitter({
  consumer_key: '90PKASnlOveSDRFTYvdPXJeKo',
  consumer_secret: '1xGkCxUADuuNYLNMY2N4RGvJUD9fw8wDyKqdzW3tWUkLL3E6hN',
  access_token: '1023092179-eaHRQxzXrQnrDpz9nGRBjPY70xZyjRGnGWMtW7p',
  access_token_secret: 'hUmbFdsl4pBkMc9NVsfOXDUuU5chD5FiTp2rEIxOmvvOc',
});
app.use(cors());
app.use(require('body-parser').json());

app.get('/home_timeline', (req, res) => {

    const params = { query: 'sol coin', max_results:20 };

    client
      .get(`https://api.twitter.com/2/tweets/search/recent`,params)
      .then(result => {

        res.send(result);
      })
      .catch(error => {
      res.send(error);
    });

});

app.get('/mentions_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 10 };

    client
      .get(`statuses/mentions_timeline`, params)
      .then(timeline => {

        res.send(timeline);
      })
      .catch(error => {
      res.send(error);
    });

});

app.post('/post_tweet', (req, res) => {

  tweet = req.body;

    client
      .post(`statuses/update`, tweet)
      .then(tweeting => {
        console.log(tweeting);

        res.send(tweeting);
      })

     .catch(error => {
      res.send(error);
    });


});

// npm install twit body-parser cors express
