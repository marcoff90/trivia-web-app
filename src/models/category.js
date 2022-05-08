import sequelize from "../config/database";
import DataTypes from "sequelize";


const Category = sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {timestamps: false});

export default Category;

