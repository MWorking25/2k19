var schedule = require('node-schedule');
var mysqldump  = require('mysqldump');


var j = schedule.scheduleJob('0 0 * * *', function(){
    mysqldump({
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: "",
            database: process.env.DB_NAME,
        },
        dumpToFile: './DbBackup/Unity/'+process.env.DB_NAME+'.sql',
    });
  });
