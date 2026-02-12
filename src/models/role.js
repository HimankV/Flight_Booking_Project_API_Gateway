"use strict";
const { Model } = require("sequelize");
const { CUSTOMER, FLIGHT_COMPANY, ADMIN } =
  require("../utils/common").Enums.USER_ROLES_ENUMS;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "User_Roles",
        as: "users", // Use plural 'users' as alias
        foreignKey: "role_id",
      });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.ENUM({ values: [CUSTOMER, FLIGHT_COMPANY, ADMIN] }),
        allowNull: false,
        defaultValue: CUSTOMER,
      },
    },
    {
      sequelize,
      modelName: "Role",
    },
  );
  return Role;
};
