'use strict';
module.exports = (sequelize, DataTypes) => {

    var Author = sequelize.define('Author', {
        authorName: {
            type: DataTypes.STRING
        }
    });
    
    Author.associate = function(models) {
        models.Author.belongsToMany(models.Book, { through: 'BookAuthor' }); 
    };

    return Author
}
