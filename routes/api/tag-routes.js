const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// this route finds all tag 
router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// finds a specific tag by its id
router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{model: Product}]
    }); 
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// creates a new tag
router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }

});

// updates a specific tag by id 
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      },
    })
    .then ((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

// deletes a specific tag by its id 
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
