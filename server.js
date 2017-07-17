const http = require('http');
const express = require('express');
var bodyParser = require('body-parser');
var CallApi = require('./models/apicall.js');
var path = require('path');

const PORT = process.env.PORT || 8000;
const app = express();
var router = express.Router();

app.set('view engine', 'ejs');
app.set('views', './views');
//set up static lib folders
app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/assets", express.static(__dirname + '/assets'));

//enable body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.render('index');
});

//handle the api post
app.post('/callApi', (req, res) => {
    CallApi.callApi(req.body, (err, data) => {
        if (err) {
            res.send('error')
        } else {
            return res.send([data, 'success']);
        }
    });
})

app.post('/achieveData', (req, res) => {
    CallApi.getAchieveData(req.body, (err, data) => {
        if (err) {
            console.log("here");
            res.send('error')
        } else {
            return res.send([data, 'success']);
        }
    })
})


const server = http.createServer(app);

//start server
server.listen(PORT, function listening() {
    console.log('Listening on ' + server.address().port);
})
