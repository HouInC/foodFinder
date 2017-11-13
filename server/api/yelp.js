/* eslint-disable */
const router = require('express').Router()
const axios = require('axios');
const yelp = require('yelp-fusion');
module.exports = router;

router.post('/restaurant', (req, res, next) => {
    const clientId = process.env.client_id,
        clientSecret=process.env.client_secret,
        searchRequest = {
        term: req.body.food,
        latitude: req.body.lat,
        longitude: req.body.lng,
        categories: 'restaurants',
        limit: 10,
        radius: 1000,
        sort_by: 'rating',
        price: '1,2',
        open_now: true
    }
    yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest)
            .then(response => {
                res.json(response.jsonBody.businesses);
            })
            .catch(next);
    })
})