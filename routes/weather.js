const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/api/weather', (req, res) => {
    const url = "https://api.openweathermap.org/data/3.0/onecall?lat=50.0840&lon=14.4535&units=metric&exclude=minutely,hourly,alerts&appid=" + process.env.OPEN_WEATHER_KEY
    axios.get(url)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.log(error)
        })
});

module.exports = router