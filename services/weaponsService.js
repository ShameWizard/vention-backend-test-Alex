const { find } = require('../models/weapon');

const WeaponsService = () => {
  const getWeapon = async (id) => {
    return find(id);
  };

  return { getWeapon };
};

module.exports = WeaponsService;
