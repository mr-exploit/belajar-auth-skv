const { Model, DataTypes } = require('sequelize');
const conn = require('./index');

class Article extends Model {
    static async findIniKontenMaxTwo() {
        return await this.findAll({
            where: {
                konten: 'ini konten',
            },
            limit: 2,
        });
    }
}
Article.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    judul: {
        type: DataTypes.STRING,
    },
    konten: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: conn,
    tableName: 'article',
    timestamps: false,
});

module.exports = Article;
