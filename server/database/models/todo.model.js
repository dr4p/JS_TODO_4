const Sequelize = require("sequelize");
const { SequelizeInst } = require("..");

class Task extends Sequelize.Model {}

Task.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    },

    { sequelize: SequelizeInst, underscored: true, modelName: "todo" }
);

module.exports = Task;