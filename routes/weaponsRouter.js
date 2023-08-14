const router = require('express').Router();

const WeaponsService = require('../services/weaponsService');

router.get('/:id', async (req, res) => {
  try {
    const weapon = await WeaponsService().getWeapon(req.params.id);
    res.status(200).json(weapon);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
