const { find, update } = require('../models/material');

const MaterialService = () => {
  const getMaterial = async (id) => {
    return find(id);
  };

  const updateMaterial = async (id, base_power) => {
    return update(id, base_power);
  };

  return {
    getMaterial,
    updateMaterial
  };
};

module.exports = MaterialService;
