

const { Controller } = require('egg');

class PatientController extends Controller {
    async create() {
        const { ctx, service } = this;
        const result = await service.patient.create(ctx.request.body);
        ctx.response.status = 200;
        ctx.response.body = result;
    }
    async findOneByPersonId() {
        const { ctx, service } = this;
        const personId = ctx.params.ppid;
        if ( !personId ) {
            ctx.status = 400;
            ctx.body = {
                'status': 10001,
                'msg': 'Person id number was required.'
            };
            return;
        }
        const result = await service.patient.findOneByPersonId(personId);
        ctx.status = 200;
        ctx.body = result;
    }
    async findByNameTel() {
        const { ctx, service } = this;
        const { tel, name } = ctx.request.body;
        if (!tel && !name) {
            ctx.status = 400;
            ctx.body = {
                'status': 10001,
                'msg': 'Telphone number or name was required.'
            };
            return;
        } else {
            if ( !tel ) {
                const result = await service.patient.findByName(name);
                ctx.status = 200;
                ctx.body = result;
            } else if ( !name ) {
                const result = await service.patient.findByTel(tel);
                ctx.status = 200;
                ctx.body = result;
            } else {
                const result = await service.patient.findByNameTel(tel, name);
                ctx.status = 200;
                ctx.body = result;
            }
        }
    }
    async findByPersonId() {
        const { ctx, service } = this;
        const personId = ctx.params.ppid;
        if ( !personId ) {
            ctx.status = 400;
            ctx.body = {
                'status': 10001,
                'msg': 'Person id number was required.'
            };
            return;
        }
        const result = await service.patient.findByPersonId(personId);
        ctx.status = 200;
        ctx.body = result;

    }
    async findWhere() {
        const { ctx, service } = this;
        const cond = ctx.request.body;
        const result = await service.patient.findWhere(cond);
        ctx.status = 200;
        ctx.body = result;
    }
    async removeByPid() {
        const { ctx, service } = this;
        const pid = ctx.params.pid;
        if ( !pid ) {
            ctx.status = 400;
            ctx.body = {
                'status': 10001,
                'msg': 'Person id number was required.'
            };
            return;
        }
        const result = await service.patient.removeByPid(pid);
        ctx.status = 200;
        ctx.body = result;
    }
}

module.exports = PatientController;
