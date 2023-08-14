const router = require('express').Router();

const MaterialService = require('../services/materialService.js');

router.get('/:id', async (req, res) => {
  try {
    const material = await MaterialService().getMaterial(req.params.id);
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { base_power } = req.body;
    const { id } = req.params;
    const updatedMaterial = await MaterialService().updateMaterial(
      id,
      base_power
    );
    res.status(200).json(updatedMaterial);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
