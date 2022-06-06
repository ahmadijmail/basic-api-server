"use strict";

const clothes = (sequelize, DataTypes) =>
    sequelize.define("clothes", {
        nameOfclothes: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        category: {
            type: DataTypes.STRING,
        },
    });

    module.exports = clothes;
