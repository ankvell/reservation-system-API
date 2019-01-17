const _moment = require('moment');

const MINUTES = 60;

class Helper {
  static timeTransform(time, duration) {
    const start = _moment(time).toISOString();
    const end = _moment(time).add(MINUTES * duration, 'minutes').toISOString();

    return { start, end }
  }

  static checkTimeFormat(time) {
    return _moment(time, _moment.ISO_8601, true).isValid() && _moment(time).isValid();
  }
}
module.exports = Helper;