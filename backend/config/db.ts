import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

console.log("DB PASSWORD", process.env.PG_DB_PASSWORD);

export const sequelize = new Sequelize({
  database: process.env.PG_DB,
  username: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  host: process.env.PG_DB_HOST,
  port: parseInt(process.env.PG_DB_PORT || "5432"),
  dialect: "postgres",
});
