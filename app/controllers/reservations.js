const ReservationService = require('../services/reservations.service');
const TablesService = require('../services/tables.service');
const _utils = require('../utils/helper');
const _to = require('../utils/to');

class Reservations {
  static async createReservation(req, res) {
    let err, response;
    const { guests, time, duration } = req.body.reservation;
    const { start, end } = _utils.timeTransform(time, duration);

    [err, response] = await _to(ReservationService.create({ guests, start, end, table_id: 12 }));

    if (err) throw new Error('Error occurred while saving reservation');
    res.sendStatus(201);
  }

  static async getReservationInfo(req, res) {
    let err, response;
    [err, response] = await _to(ReservationService.getReservationById(req.params.reservation_id));

    if (reservation) {
        const reservationInfo = {
            reservation: {
                table: { number: response.number, capacity: response.capacity },
                id: response.id,
                guests: response.guests,
                start: response.start,
                end: response.end
            }
        }
        res.status(200).json(reservationInfo);
    }

    if (err) throw new Error('Error occurred while getting reservation data');
    res.sendStatus(200);
  }

  static async updateReservation(req, res) {
    res.sendStatus(200);
  }

  static async deleteReservation(req, res) {
    let err, response;
    [err, response] = await _to(ReservationService.delete(req.params.reservation_id));

    if (err) throw new Error('Error occurred while getting reservation data');

    if (!response) res.status(404).send('Not found');
    else res.sendStatus(200);
  }
}

module.exports = Reservations;
