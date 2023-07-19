const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection')

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        isNull: false,
        isInt: true
      }
    },
    product_id: {
      type: DataTypes.INTEGER
    },
    tag_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    initialAutoIncrement: 0,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag'
  }
)

module.exports = ProductTag
