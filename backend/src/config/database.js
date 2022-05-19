import {Sequelize} from 'sequelize';
import 'dotenv/config';

const {
  RDS_DB_NAME,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_HOSTNAME,
  DIALECT
} = process.env;

const sequelize = new Sequelize(RDS_DB_NAME, RDS_USERNAME,
    RDS_PASSWORD, {
      dialect: DIALECT || "mysql",
      host : RDS_HOSTNAME
    });

export default sequelize;
