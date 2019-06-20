
module.exports = {
    port:process.env.PORT || 3030,
    dburl:require('./env.'+process.env.NODE_ENV),
    livefilesUrl:'http://103.252.7.5:8300/unity/uploads/',
    devfilesUrl:'http://localhost:8300/unity/uploads/'
};