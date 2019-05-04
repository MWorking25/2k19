const express = require('express'),
    bodyParser = require('body-parser'),
    env = require('./config/env/env'),
    routes = require('./routes/routers'),
    cors = require('cors')
    morgan = require('morgan'),
    logger = require('./config/logger'),
    connection = require('./projects/unity/config/connection'),
    unitmodel = require('./projects/unity/models/tables');

const app = express();

app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '10mb'
}));

app.use(cors());

app.use((err,req,res,next) =>{
    if (!err) return next(); // you also need this line
    logger.writeLogs({path:"server/application_error/",line:"28",message:err});
    res.send((err.status || 500), {error: err});
});


connection.init();
unitmodel.create();


const domainPing = require("domain-ping");
 
domainPing('103.252.7.90') // Insert the domain you want to ping
    .then((res) => {
        console.log(res); // Replace with your code
    })
    .catch((error) => {
        console.error(error);
    });

    const isPortReachable = require('is-port-reachable');
 
(async () => {
    console.log(await isPortReachable(23, {host: '172.172.172.228'}));
    //=> true
})();


app.use('/api', routes);

var server = app.listen(parseInt(env.port), function () {
    console.log('server start on ' + server.address().port + ' port');
});