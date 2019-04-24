const crypto = require('crypto');

var encryptionKey = process.env.CHEM_ENCRYPTED_KEY;
module.exports = {

    encryptText: function (text) {
        try {
            if (text === null || typeof text === 'undefined') {
                return text;
            };
            var cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
            var crypted = cipher.update(text, 'utf8', 'hex');
            crypted += cipher.final('hex');
            return crypted;
        } catch (err) {}
    },

    decryptText: function (text) {
        try {
            if (text === null || typeof text === 'undefined') {
                return text;
            };
            var decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
            var dec = decipher.update(text, 'hex', 'utf8');
            dec += decipher.final('utf8');
            return dec;
        } catch (err) {}
    },

    encryptObj: function (obj) {
        if (obj != null && obj['bginfo'] != 'undefined' && obj['selectinjuries'] != 'undefined') {
            var includeobj = ['bginfo', 'selectinjuries'];
            for (var sectionName in includeobj) {
                var o = obj[includeobj[sectionName]];
                for (var prop in o) {
                    var value = o[prop];
                    if (typeof value === 'object' || prop == '_id' || prop == 'id' || prop == 'status' || prop == 'updatedby' || prop == 'updateddate') {} else {
                        try {
                            if (value != true)
                                try {
                                    o[prop] = this.encryptText(value);
                                }
                            catch (err) {
                                console.log('error after encrypt:' + JSON.stringify(err));
                            }
                        } catch (e) {}
                    }
                }
            }
        }
        return obj;
    },
    decryptObj: function (obj) {
        if (obj != null && obj['bginfo'] != 'undefined' && obj['selectinjuries'] != 'undefined') {
            var includeobj = ['bginfo', 'selectinjuries'];
            for (var sectionName in includeobj) {
                var o = obj[includeobj[sectionName]];
                for (var prop in o) {
                    var value = o[prop];
                    if (typeof value === 'object' || prop == '_id' || prop == 'id' || prop == 'status' || prop == 'updatedby' || prop == 'updateddate') {} else {
                        o[prop] = this.decryptText(value);
                    }
                }
            }
        }
        return obj;
    }
};