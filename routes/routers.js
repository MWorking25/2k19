const express = require('express'),
      app = express();
        
    //   Route files declaration
    const unityRoutes = require('../projects/unity/unity.route');

    // Accessing routes apis
    var apiunity = app.use('/unity',unityRoutes)

    module.exports = apiunity;
