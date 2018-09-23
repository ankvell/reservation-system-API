const ReservationService = require('../services/reservations.service');
const TablesService = require('../services/tables.service');
const _utils = require('../utils/helper');
const _to = require('../utils/to');

class Reservations {
  static async createReservation(req, res) {
    let err, reserved, available, response;
    const { guests, time, duration } = req.body.reservation;
    const { start, end } = _utils.timeTransform(time, duration);

    [err, reserved] = await _to(ReservationService.checkReservedSlots(start, end));
    if (err) throw new Error('Error occurred while reservation ckecking');

    const reservedTablesIds = reserved.map(reservation => reservation.id);
    [err, available] = await _to(TablesService.getAvailableTable(guests, reservedTablesIds));
    if (available) {
        [err, response] = await _to(ReservationService.create({ guests, start, end, table_id: available.id }));
        res.sendStatus(201);
    } else {
        res.status(404).send('No available tables for reservation');
    }
  }

  static async getReservationInfo(req, res) {
    let err, response;
    [err, response] = await _to(ReservationService.getReservationById(req.params.reservation_id));

    if (err) throw new Error('Error occurred while getting reservation data');
    if (response) {
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
    } else {
        res.status(404).send('Not found');
    }
  }

  static async updateReservation(req, res) {
    let err, reserved, available, response;
    const { guests, time, duration } = req.body.reservation;
    const { start, end } = _utils.timeTransform(time, duration);

    [err, reserved] = await _to(ReservationService.checkReservedSlotsExclude(start, end, req.params.reservation_id));
    if (err) throw new Error('Error occurred while reservation ckecking');

    const reservedTablesIds = reserved.map(reservation => reservation.id);
    [err, available] = await _to(TablesService.getAvailableTable(guests, reservedTablesIds));

    if (available) {
        [err, response] = await _to(ReservationService.update(req.params.reservation_id, { guests, start, end, table_id: available.id }));
        res.sendStatus(200);
    } else {
        res.status(404).send('No available tables for reservation');
    }
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
