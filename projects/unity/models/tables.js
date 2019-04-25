var connection = require('../config/connection');
var logger = require('../config/logger');
var fs = require('fs');
function verifyNCreatTables()
{
  this.create = function()
  {
  connection.acquire(function(err,con){
    if (err) {
      logger.writeLogs({
        path: "users.controller/listSalespersons",
        line: "16",
        message: err
    }, 'error');
      throw err;}
    else
    {
      var data = fs.readFileSync('./unity.json')
      var queries = JSON.parse(data);
      queries.map(function(value){
        con.query(value.Query, function(err) {
          if (err) {
            logger.writeLogs({
              path: "Tables Creations",
              line: "",
              message: err
          }, 'error');
            throw err;}
        });  
      });
    }
  })
}
}

module.exports = new verifyNCreatTables();