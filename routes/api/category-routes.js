const router = require('express').Router()
const { Category, Product } = require('../../models')
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    order: [['id', 'ASC']],
    include: Product
  }).catch((err) => res.json(err))
  res.json(categories)
})

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      include: Product,
      where: {
        id: req.params.id
      }
    })
    if (categoryData == null) {
      throw new Error('Category Not Found!')
    } else {
      res.status(200).json(categoryData)
    }
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.json(newCategory)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update({
      id: req.params.id,
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    })
    res.json(updatedCategory)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedCategory)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
