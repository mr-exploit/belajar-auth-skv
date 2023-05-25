const { Model , DataTypes} = require('sequelize');
const conn = require('./index');

class Category extends Model {}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING,
    },
    deskripsi: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: conn,
    tableName: 'category',
    timestamps: false,
});

module.exports = Category;
