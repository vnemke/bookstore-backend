'use strict';
module.exports = (sequelize, DataTypes) => {

    var Publisher = sequelize.define('Publisher', {
        publisherName: {
            type: DataTypes.STRING
        }
    });
    
    Publisher.associate = function(models) {
        models.Publisher.hasMany(models.Book)
    };

    return Publisher
}