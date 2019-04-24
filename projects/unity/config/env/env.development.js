
module.exports = {
    mongoose:{
        uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
    },
    encryption:{
        secret:process.env.CHEM_ENCRYPTED_KEY
    },
    jwtsecret:
    {
        secret:process.env.CHEM_JWT_SECRET
    }
};