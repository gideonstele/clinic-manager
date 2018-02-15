const moment = require('moment');

function fmtDate(date) {
    return moment(date).format(moment.HTML5_FMT.DATE);
}

function fmtDateTime(time) {
    return moment(date, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
}

module.exports = {
    fmtDate,
    fmtDateTime
};
