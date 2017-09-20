module.exports = function(sequelize, DataTypes) {
    var Mission = sequelize.define("Mission", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Mission.associate = function(models) {
        Mission.belongsTo(models.Agent, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Mission;
};