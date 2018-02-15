
const { Service } = require('egg');

class AdminService extends Service {
    async login(aname, apwd) {
        const { app, ctx } = this;
        const admin = await app.mysql.get('adm', {
            aname
        });
        if (!admin) {
            return {
                'status': {
                    'code': 10001,
                    'msg': 'username does not exist.'
                }
            }
        }
        if (admin.apwd === apwd) {
            ctx.session = {
                'aid': String(admin.aid),
                'sign': true
            }
            return {
                'status': {
                    'code': 0,
                    'msg': 'OK'
                }
            };
        }
        return {
            'status': {
                'code': 10002,
                'msg': 'Opassword does not validated.'
            }
        };;
    }
    async logout() {
        const { app, ctx } = this;
        ctx.session = null;
        return {
            'status': {
                'code': 0,
                'msg': 'Log out successfully !'
            }
        }
    }
}

module.exports = AdminService;
