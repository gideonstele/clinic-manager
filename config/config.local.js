
module.exports = appInfo => {

    const config = {};

    config.mysql = {
        client: {
            // host
            host: '127.0.0.1',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: 'root',
            // 数据库名
            database: 'zuoyisheng',
        }
    };
    /*
    config.sequelize = {
        dialect: 'mysql',
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'root',
        // 数据库名
        database: 'zuoyisheng',
    }
    */
    config.cors = {
        'origin': 'http://shijinyudeMBP.lan'
    }

    config.security = {
        domainWhiteList: ['http://localhost:7001', 'https://localhost:7001', 'http://shijinyudeMBP.lan'],

        csrf: {
            headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
            useSession: false, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
            cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
            sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
        },
    };

    return config;

}
