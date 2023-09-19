const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// gets all categories
router.get('/', async (req, res) => {
  try {
    const categoryElements = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryElements);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets a specific category by id 
router.get('/:id', async (req, res) => {
  try {
    const categoryElements = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if (!categoryElements) {
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }

    res.status(200).json(categoryElements);

  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new category
router.post('/', async (req, res) => {
  try {
    const categoryElements = await Category.create(req.body);
    res.status(200).json(categoryElements);
  } catch (err) {
    res.status(400).json(err);
  }
});

// updates a specific category by id 
router.put('/:id',  (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
  
});

// deletes a specific category by id 
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((destroyedCategory) => {
      res.json(destroyedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
