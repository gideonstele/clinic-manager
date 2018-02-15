
const { Service } = require('egg');

const REGS = require('../utils/regs');
const convert2py = require('../utils/convert2py');
const { fmtDate } = require('../utils/moment');

const valiPatient = {
    ppid: {
        required: false,
        type: 'string',
        format: REGS.idnum,
        max: 18,
        min: 18
    },
    pname: {
        type: 'string'
    },
    pbirdate: {
        type: 'date'
    },
    ptel: {
        type: 'string'
    },
    paddress: {
        required: false,
        type: 'string'
    },
    pnote: {
        required: false,
        type: 'string'
    }
};

class PatientService extends Service {
    async create(newData) {
        const { app } = this;
        const errors = app.validator.validate(valiPatient, newData);
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
                const result = await app.mysql.beginTransactionScope( async (conn) => {
                    await conn.insert('patient', {
                        'ppid': newData.ppid,
                        'pname': newData.pname,
                        'ppinyin': convert2py(newData.pname),
                        'pbirdate': fmtDate(newData.pbirdate),
                        'ptel': newData.ptel,
                        'paddress': newData.paddress,
                        'pnote': newData.pnote
                    });
                    const lastId = await conn.query('SELECT LAST_INSERT_ID();');
                    console.log(lastId[0]['LAST_INSERT_ID()'])
                    return await conn.get('patient', {
                        'pid': lastId[0]['LAST_INSERT_ID()']
                    });
                });
                return {
                    'status': {
                        'code': 0,
                        'msg': 'SUCCESS',
                    },
                    'data': result
                };
            } catch (err) {
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
    async findOneByPersonId(personId) {
        const { app, ctx } = this;
        const patient = await qpp.mysql.get('patient', {
            ppid: personId
        });
        return {
            'status': {
                'code': 0,
                'msg': 'SUCCESS',
            },
            'data': patient
        }
    }
    async findByNameTel(tel, name) {
        const { app, ctx } = this;
        let pystr = '';
        // 是否全部为汉字
        if (/.*[/u4e00-/u9fa5]+.*$/.test(name)) {
            pystr = aconvert2py(name);
        } else {
            pystr = name;
        }
        const result = await app.mysql.select('patient', {
            where: {
                'ptel': tel,
                'ppinyin': pystr
            }
        });
        return {
            'status': {
                'code': 0,
                'msg': 'SUCCESS',
            },
            'data': result
        }
    }
    async findByName(name) {
        const { app, ctx } = this;
        let pystr = '';
        // 是否全部为汉字
        if (/[\u4e00-\u9fa5]/.test(name)) {
            pystr = convert2py(name);
        } else {
            pystr = name;
        }
        const results = await app.mysql.select('patient', {
            where: {
                'ppinyin': pystr
            }
        });
        return {
            'status': {
                'code': 0,
                'msg': 'SUCCESS',
            },
            'data': results
        }
    }
    async findByPersonId(personId) {
        const { app, ctx } = this;
        const patient = await qpp.mysql.select('patient', {
            where: {
                'ppid': personId
            }
        });
        return {
            'status': {
                'code': 0,
                'msg': 'SUCCESS',
            },
            'data': patient
        }
    }
    async findByTel(tel) {
        const { app, ctx } = this;
        const results = await app.mysql.select('patient', {
            where: {
                'ptel': tel,
            }
        });
        return {
            'status': {
                'code': 0,
                'msg': 'SUCCESS',
            },
            'data': results
        }
    }
    async findWhere(cond) {
        const { app, ctx } = this;
        const results = await app.mysql.select('patient', {
            where: cond
        });
        return {
            'status': {
                'code': 0,
                'msg': 'SUCCESS',
            },
            'data': results
        };
    }
    async removeByPid(pid) {
        const { app, ctx } = this;
        const results = await app.mysql.delete('patient', {
            where: {
                pid
            }
        });
        return {
            'status': {
                'code': 0,
                'msg': 'SUCCESS',
            },
            'data': results
        };
    }
}

module.exports = PatientService;
