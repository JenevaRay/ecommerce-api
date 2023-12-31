const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection.js')

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    tag_name: {
      type: DataTypes.STRING
    }
    // define columns
  },
  {
    sequelize,
    initialAutoIncrement: 0,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag'
  }
)

module.exports = Tag
