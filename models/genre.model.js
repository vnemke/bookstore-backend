'use strict';
module.exports = (sequelize, DataTypes) => {

    var Genre = sequelize.define('Genre', {
        genreName: {
            type: DataTypes.STRING
        }
    });
    
    Genre.associate = function(models) {
        models.Genre.belongsToMany(models.Book, { through: 'BookGenre' });
    };

    return Genre
}