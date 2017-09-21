module.exports = function(sequelize, DataTypes) {
    var Agent = sequelize.define("Agent", {
        username: DataTypes.STRING,
        userScore: DataTypes.INTEGER
    });

    Agent.associate = function(models) {

        Agent.hasMany(models.Question, {
            onDelete: "cascade"
        });
    };

    return Agent;
};