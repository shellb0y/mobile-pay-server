/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket_order', {
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    _data: {
      type: DataTypes.JSON,
      allowNull: false
    },
    _status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    _version:{
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ext: {
      type: DataTypes.JSON,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'ticket_order'
  });
};
