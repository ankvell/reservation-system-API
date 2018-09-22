const _moment = require('moment');

const MINUTES = 60;

class Helper {
  static timeTransform(time, duration) {
    const start = _moment(time).toISOString();
    const end = _moment(time).add(MINUTES * duration, 'minutes').toISOString();

    return { start, end }
  }
}
module.exports = Helper;