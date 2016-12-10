/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
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
        cookie: {
            type: DataTypes.STRING,
            allowNull: false
        },
        _source: {
            type: DataTypes.STRING,
            allowNull: false
        },
        get_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        _status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        get_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        order_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        queue_count:{
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'account'
    });
};
