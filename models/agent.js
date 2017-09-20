module.exports = function(sequelize, DataTypes) {
    var Agent = sequelize.define("Agent", {
        // Giving the Author model a name of type STRING
        agentname: DataTypes.STRING,
        username: DataTypes.STRING
    });

    Agent.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Agent.hasMany(models.Mission, {
            onDelete: "cascade"
        });
    };

    return Agent;
};