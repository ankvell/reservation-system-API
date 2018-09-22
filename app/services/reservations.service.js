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

  static create(data) {
    return db('reservations').insert(data, '*');
  }

  static update(id, reservation) {
    return db('reservations').where('id', '=', id).update(reservation);
  }

  static delete(id) {
    return db('reservations').where('id', id).del();
  }
}

module.exports = ReservationService;