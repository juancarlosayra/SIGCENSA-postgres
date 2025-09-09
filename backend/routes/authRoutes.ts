import express from "express";
import { LdapLogin } from "../controllers/authController";

const router = express.Router();

router.post("/login", LdapLogin);

export default router;
