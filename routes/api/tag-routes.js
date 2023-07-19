const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({ include: Product }).catch((err) => res.json(err))
  res.json(tags)
})

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      include: Product,
      where: {
        id: req.params.id
      }
    })
    if (tagData == null) {
      throw new Error('Tag Not Found!')
    } else {
      res.status(200).json(tagData)
    }
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    if (req.body && req.body.tag_name !== undefined) {
      const newTag = await Tag.create(req.body)
      if (req.body.productIds.length) {
        const tagProductIdArr = req.body.productIds.map((product_id) => {
          return {
            tag_id: newTag.id,
            product_id
          }
        })
        const productTagIds = await ProductTag.bulkCreate(tagProductIdArr)
        res.status(200).json(productTagIds)
      } else {
        res.status(200).json(newTag)
      }
    } else {
      res.status(400).json({
        'body should look like this...': { tag_name: 'sports equipment', productIds: [2, 3] }
      })
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const body = req.body
    if (!body.id) {
      body.id = req.params.id
    }
    const tag = await Tag.update(body, {
      where: {
        id: req.params.id
      }
    })
    const oldProductTags = await ProductTag.findAll({
      where: { tag_id: req.params.id }
    })
    const productTagIds = oldProductTags.map(({ product_id }) => product_id)
    const newProductTags = req.body.productIds
      .filter((product_id) => !productTagIds.includes(product_id)).map((product_id) => {
        return {
          tag_id: body.id,
          product_id
        }
      })
    const productTagsToRemove = oldProductTags
      .filter(({ product_id }) => !req.body.productIds.includes(product_id))
      .map(({ id }) => id)
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags)
    ])
    if (updatedProductTags.length > 0) {
      res.status(200).json(updatedProductTags)
    } else {
      res.status(200).json(tag)
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedTag)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
