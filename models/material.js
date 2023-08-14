const db = require('../config/dbConfig.js');
const table = 'materials';

class Material {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.base_power = payload.base_power;
    this.qty = payload.qty;
    this.deleted_at = payload.deleted_at;
  }

  static async find(id) {
    const material = await db(table).where('id', id).first();
    if (!material) return null;
    return new Material(material);
  }

  static async update(id, base_power) {
    const material = await db(table).where('id', id).update({
      base_power: base_power
    });
    if (!material) return null;
    const updatedMaterial = await db(table).where('id', id).first();

    return new Material(updatedMaterial);
  }
}

module.exports = Material;
