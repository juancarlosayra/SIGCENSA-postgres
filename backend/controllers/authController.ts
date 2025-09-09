import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { authenticateWithLdap } from "../config/ldap";

export const LdapLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    console.log("Attempting LDAP login for user:", username);

    const ldapUser = await authenticateWithLdap(username, password);

    return res.json({
      message: "Login successful",
      user: {
        name: ldapUser.displayName,
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message;

    console.error("Login error:", errorMessage);

    switch (errorMessage) {
      case "CREDENTIALS_REQUIRED":
        return res.status(400).json({
          error: {
            message: "Username and password are required",
            code: "CREDENTIALS_REQUIRED",
          },
        });
      case "INVALID_CREDENTIALS":
        return res.status(401).json({
          error: {
            message: "Invalid credentials",
            code: "INVALID_CREDENTIALS",
          },
        });
      case "USER_NOT_FOUND":
        return res.status(404).json({
          error: {
            message: "User not found in directory",
            code: "USER_NOT_FOUND",
          },
        });
      default:
        return res.status(500).json({
          error: {
            message: "Error during login",
            code: "LOGIN_ERROR",
          },
        });
    }
  }
};
