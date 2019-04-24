module.exports = {
    mongoose:{
        uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
    }
};