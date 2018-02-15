
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


    return config;

}
