const py = require('pinyinlite');

module.exports = function(str) {
    return py(str, {
        keepUnrecognized: true
    }).reduce((_str, item) => {
        _str = Array.isArray(_str) ? _str[0] : _str;
        if(typeof item === 'string') {
            _str += item;
        } else if( Array.isArray(item) ){
            _str += item[0];
        }
        return _str;
    });
}
