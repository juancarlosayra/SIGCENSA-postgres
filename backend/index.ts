import express, { Request, Response } from "express";
import { sequelize } from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express + Sequelize!");
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected.");
    //await sequelize.sync();
    console.log("✅ Database synced.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
})();
