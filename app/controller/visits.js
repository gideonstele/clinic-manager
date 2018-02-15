

const { Controller } = require('egg');

class VisitController extends Controller {
    async create() {
        const { ctx, service } = this;
        const pid = ctx.params.pid;
        const aid = ctx.session.aid;
        const result = await service.visits.create(aid, pid, ctx.request.body);
        console.log(result);
        ctx.response.status = 200;
        ctx.response.body = result;
    }
}

module.exports = VisitController;
