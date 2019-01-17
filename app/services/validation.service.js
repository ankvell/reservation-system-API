const _utils = require('../utils/helper');

const VALIDITY_PARAMETERS = {
  MIN_GUESTS_NUMBER: 1,
  MAX_GUESTS_NUMBER: 10,
  RESERVATION_DURATION_MIN: 0.5,
  RESERVATION_DURATION_MAX: 6
};

class ValidationService {
  static checkParameters(params) {
    return (
      !Number.isInteger(params.guests) ||
      params.guests < VALIDITY_PARAMETERS.MIN_GUESTS_NUMBER ||
      params.guests > VALIDITY_PARAMETERS.MAX_GUESTS_NUMBER ||
      isNaN(params.duration) ||
      params.duration < VALIDITY_PARAMETERS.RESERVATION_DURATION_MIN ||
      params.duration > VALIDITY_PARAMETERS.RESERVATION_DURATION_MAX ||
      !_utils.checkTimeFormat(params.time)
    )
  }
}

module.exports = ValidationService;
