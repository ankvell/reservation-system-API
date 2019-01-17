const db = require('../../db');

class TablesService {
  
  static getAvailableTable(capacity, id) {
    return db('tables')
      .select('tables.id', 'tables.number', 'tables.capacity')
      .where('tables.capacity', '>=', capacity)
      .whereNotIn('tables.id', id)
      .orderBy('number', 'asc')
      .first();
  }
}

module.exports = TablesService;