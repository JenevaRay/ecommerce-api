const router = require('express').Router()
const { Product, Category, Tag, ProductTag } = require('../../models')

router.get('/', async (req, res) => {
  const products = await Product.findAll({ include: [Category, Tag] }).catch((err) => res.json(err))
  res.json(products)
})

router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findOne({
      include: [Category, Tag],
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(productData)
  } catch (err) {
    res.status(404).json(err)
  }
})

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      "product_name": "Basketball",
      "price": 200.00,
      "stock": 3,
      "tagIds": [1, 2, 3, 4]
    }
  */
  try {
    if (req.body && req.body.product_name && req.body.price && req.body.stock && req.body.tagIds && req.body.category_id) {
      const product = await Product.create(req.body)
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id
          }
        })
        const productTagIds = await ProductTag.bulkCreate(productTagIdArr)
        res.status(200).json(productTagIds)
      } else {
        res.status(200).json(product)
      }
    } else {
      res.status(400).json({
        'body should look like this...': {
          product_name: 'Basketball',
          price: 200,
          stock: 3,
          tagIds: [1, 2, 3, 4]
        }
      })
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const body = req.body
    if (!body.id) {
      body.id = req.params.id
    }
    const product = await Product.update(body, {
      where: {
        id: req.params.id
      }
    })
    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id }
    })
    const productTagIds = productTags.map(({ tag_id }) => tag_id)
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id)).map((tag_id) => {
        return {
          product_id: body.id,
          tag_id
        }
      })
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id)
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags)
    ])
    if (updatedProductTags.length > 0) {
      res.status(200).json(updatedProductTags)
    } else {
      res.status(200).json(product)
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedProduct)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
