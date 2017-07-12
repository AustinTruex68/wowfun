const http = require('http');
const express = require('express');
var bodyParser = require('body-parser');
var CallApi = require('./models/apicall.js');
var path = require('path');

const PORT = process.env.PORT || 8000;
const app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//handle the api post
app.post('/callApi', (req, res) => {
    CallApi.callApi(req.body, (err, data) => {
        if (err) {
            console.log("here");
            res.send('error')
        } else {
            console.log(data);
            return res.send([data, 'success']);
        }
    });
})


const server = http.createServer(app);

//start server
server.listen(PORT, function listening() {
    console.log('Listening on ' + server.address().port);
})
