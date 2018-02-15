
module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1518335281316_5350';

    config.session = {
        maxAge: 24 * 3600 * 1000, // ms
        key: 'zys_session',
        httpOnly: true,
        encrypt: true,
    };

    // add your config here
    config.middleware = [ 'errorHandle' ];

    config.security = {
        csrf: {
            ignoreJSON: true,
        }
    }

    config.cors = {
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        credentials: true,
    }

    return config;
};
