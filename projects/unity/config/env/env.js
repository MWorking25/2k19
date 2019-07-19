
module.exports = {
    port:process.env.PORT || 3030,
    dburl:require('./env.'+process.env.NODE_ENV),
    livefilesUrl:'http://103.252.7.5:3800/unity/uploads/',
    devfilesUrl:'http://localhost:3800/unity/uploads/'
};