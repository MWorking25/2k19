
module.exports = {
    port:process.env.PORT || 3030,
    dburl:require('./env.'+process.env.NODE_ENV),
};