const db = require('../config/dbConfig.js');
const table = 'weapons';
const materialsTable = 'materials';
const compositionsTable = 'compositions';
class Weapon {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.power_level = payload.power_level;
    this.qty = payload.qty;
  }

  static async find(id) {
    const weapon = await db(table).where('id', id).first();
    if (!weapon) return null;

    const { material_1_id, material_2_id, material_3_id } = weapon;
    const requiredMaterialIds = [{ [material_1_id]: 1 }];
    if (material_2_id) {
      requiredMaterialIds.push({ [material_2_id]: 1 });
    }
    if (material_3_id) {
      requiredMaterialIds.push({ [material_3_id]: 1 });
    }

    const recursiveGetWeaponPowerAndQty = async (mats) => {
      let layerPower = 0;
      let layerSmallestAmount = 10000000000;

      for (const mat of mats) {
        const id = Object.keys(mat)[0];
        const newMaterial = await db(materialsTable).where('id', id).first();
        if (!newMaterial) {
          throw new Error('Could not find Material');
        }
        const newCompositions = await db(compositionsTable).where(
          'parent_id',
          id
        );
        const materialSmallestAmount = Math.floor(newMaterial.qty / mat[id]);
        if (materialSmallestAmount < layerSmallestAmount) {
          layerSmallestAmount = materialSmallestAmount;
        }
        layerPower = layerPower + newMaterial.base_power * mat[id];
        if (newCompositions.length > 0) {
          let nextLayerMaterials = [];
          newCompositions.forEach((c) => {
            const { material_id, qty } = c;
            nextLayerMaterials.push({ [material_id]: qty * mat[id] });
          });
          const nextLayerPowerAndAmount = await recursiveGetWeaponPowerAndQty(
            nextLayerMaterials
          );

          layerPower = layerPower + nextLayerPowerAndAmount.layerPower;
          layerSmallestAmount =
            materialSmallestAmount +
            nextLayerPowerAndAmount.layerSmallestAmount;
        }
      }
      return { layerPower, layerSmallestAmount };
    };
    const generatedWeaponInfo = await recursiveGetWeaponPowerAndQty(
      requiredMaterialIds
    );
    weapon.qty = generatedWeaponInfo.layerSmallestAmount;
    weapon.power_level = generatedWeaponInfo.layerPower;
    return new Weapon(weapon);
  }
}

module.exports = Weapon;
