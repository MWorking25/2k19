const express = require('express'),
      app = express();
        
    //   Route files declaration
    const unityRoutes = require('../projects/unity/unity.route');
    const unityMobileRoutes = require('../projects/unity/unityMobile.route');

    // Accessing routes apis
    var apiunity = app.use('/unity',unityRoutes)
    var apimobileunity = app.use('/mobile/unity',unityMobileRoutes)

    module.exports = apiunity;
    module.exports = apimobileunity;
