
const { Service } = require('egg');

const REGS = require('../utils/regs');
const convert2py = require('../utils/convert2py');
const { fmtDate } = require('../utils/moment');

const valiVisit = {
    vtime: {
        type: 'datetime'
    },
    vreason: {
        type: 'string'
    },
    vresult: {
        type: 'string'
    },
    vnote: {
        required: false,
        type: 'string'
    }
};

class VisitService extends Service {
    async create(aid, pid, newVisit) {
        const { app } = this;
        const errors = app.validator.validate(valiVisit, newVisit);
        let result;
        if(errors) {
            return  {
                'status': {
                    'code': 10002,
                    'msg': 'validate error',
                },
                'data': errors
            };
        } else {
            try {
                const { Literal } = app.mysql.literals;
                const result = await app.mysql.beginTransactionScope(async (conn) => {
                    await conn.insert('visits', {
                        aid,
                        pid,
                        ...newVisit
                    });
                    return await conn.select('visits', new Literal('LAST_INSERT_ID()'));
                }, ctx);

                return {
                    'status': {
                        'code': 0,
                        'msg': 'SUCCESS',
                    },
                    'data': result
                };
            } catch(e) {
                return {
                    'status': {
                        'code': err.code,
                        'msg': err.msg,
                    },
                    'data': 'error!'
                };
            }
        }
    }
}

module.exports = VisitService;
