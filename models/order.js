/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {

  return sequelize.define('order', {
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    origin_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transcation_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_data: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_timeout: {
      type: DataTypes.DATE,
      allowNull: false
    },
    terminal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'order'
  });
};