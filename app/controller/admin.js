

const { Controller } = require('egg');

class AdminController extends Controller {
    async login() {
        const { ctx, service } = this;
        const { aname, apwd } = ctx.request.body;
        if (!aname || !apwd) {
            ctx.status = 400;
            ctx.body = {
                'status': '-1',
                'msg': 'password empty'
            };
            return;
        }
        const validate = await service.admin.login(aname, apwd);
        ctx.body = validate;
    }
    async logout() {
        const { ctx, service } = this;
        const validate = await service.adm.logout();
        ctx.body = validate;
    }
}

module.exports = AdminController;
