var schedule = require('node-schedule');
var mysqldump  = require('mysqldump');
var googleDrive = require('google-drive');

// Authorization code : 1/BmtVQ_fZbJ7ra3bmdPdUgPlYL84g57lFLQkeEEo2xSk
// refresh token : 4/WQHHKAPbZMVfW_f2TJeYV3kkjsiHdQjJyB6JreHFxVs4XjAGyO6kkzzh8iwp2S58-Mq7Vui3lAmwFR5ThY2ZkOA
var token = 'ya29.GlsYB8QFRjnv-kaPPzqHuS6gZPvLIaIXSQZcNwZHenMd_jWRVBAL0FkGxyqmzq5rAyGy0AqXQkP-dNDT20ZxYnYwLHpIgXsEInsaOxDDaQLYFrMh7h5ry_rhrQ7f' //access token

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


    //googleDrive(token).files().insert(meta, params, callback)

  });
