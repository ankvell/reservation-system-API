const db = require('../../db');

class ReservationService {
  static getReservationById(id) {
    return db('reservations')
      .select('*')
      .from('reservations')
      .where('reservations.id', id)
      .leftJoin('tables', 'tables.id', 'reservations.table_id')
      .first();
  };

  static checkReservedSlots(start, end) {
    return db('reservations')
      .select('table_id as id')
      .where('reservations.start', '>=', start)
      .andWhere('reservations.start', '<', end);
  }

  static create(reservation) {
    return db('reservations').insert(reservation, '*');
  }

  static update(id, reservation) {
    return db('reservations').where('id', '=', id).update(reservation);
  }

  static delete(id) {
    return db('reservations').where('id', id).del();
  }
}

module.exports = ReservationService;