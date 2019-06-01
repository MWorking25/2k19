const logger = require('../config/logger'),
    connection = require('../config/connection'),
    app = express();
var sendMail = require('./mail.controller');