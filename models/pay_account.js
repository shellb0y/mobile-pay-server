/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pay_account', {
    pay_account_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    terminal: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enabled: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login_pwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pay_pwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    today_pay_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    last_pay_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'pay_account'
  });
};
