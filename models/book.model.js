'use strict';
module.exports = (sequelize, DataTypes) => {

    var Book = sequelize.define('Book', {
        bookName: {
            type: DataTypes.STRING
        },
        releaseYear: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }, 
        coverUrl: {
            type: DataTypes.TEXT
        }    
    });

    Book.associate = function(models) {
        models.Book.belongsToMany(models.Author, { through: 'BookAuthor' });
        models.Book.belongsToMany(models.Genre, { through: 'BookGenre' });
        models.Book.belongsTo(models.Publisher);  
    };
    
    return Book
}
