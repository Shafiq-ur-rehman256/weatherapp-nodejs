const path = require('path');
const express = require('express');
const request = require('request');
const hbs = require('hbs');
const { getGeoLocation } = require('../utils/index');

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

// setup handlebars and views for express
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        h1: 'Weather App',
        name: 'fsCode'
    });
});

app.get('/about', (req,res)=>{
    res.render('about', {
        h1:'About page',
        name: 'fsCode'
    })
});

app.get('/help', (req,res)=>{
    res.render('help',{
        h1:'help page',
        name: 'fsCode'
    })
});

app.get('*', (req, res)=>{
    res.render('error',{
        h1:'Page Not Found',
        name: 'fsCode'
    })
})
app.get('/weather', async (req, res) => {
    let { location } = req.query;
    let { latitude, longitude } = await getGeoLocation(location); // this fuction gets the coordinates of giving location 

    // Weather Stack Api Documentation: https://weatherstack.com/quickstart
    const url = `http://api.weatherstack.com/current?access_key=300d0733033573c95dd3c373243450d7&query=${latitude},${longitude}&units=m`;

    request({ url: url, json: true }, (err, dat) => {
        if (res) {
            let data = dat.body;
            res.status(200).send({
                error: false,
                message: data.current
            });
        }
        if (err) {
            res.status(404).send({
                error: true,
                message: 'Data Not Found!'
            })
        }
    })

})
app.listen(3030, () => {
    console.log("server is up on port 3000");
})