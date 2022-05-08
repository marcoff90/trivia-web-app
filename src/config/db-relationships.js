import sequelize from "./database";

const createRelationships = () => {
  sequelize.sync()
  .then(res => {
    console.log(res);
  })
};

export default createRelationships;
