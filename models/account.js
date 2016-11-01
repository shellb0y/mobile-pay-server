/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    account_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    _data: {
      type: DataTypes.JSON,
      allowNull: false
    },
    _source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    get_count_today: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    get_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'account'
  });
};