import { Client } from "ldapts";

const getLdapString = (value: any): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.length > 0) return String(value[0]);
  if (Buffer.isBuffer(value)) return value.toString("utf-8");
  if (Array.isArray(value) && Buffer.isBuffer(value[0]))
    return value[0].toString("utf-8");
  return undefined;
};

export const authenticateWithLdap = async (
  username: string,
  password: string
) => {
  if (!username || !password) {
    throw new Error("CREDENTIALS_REQUIRED");
  }

  const client = new Client({
    url: process.env.LDAP_URL as string,
    timeout: 5000,
    connectTimeout: 5000,
  });

  const bindDN = `cn=${username},${process.env.LDAP_USER}`;
  console.log("Attepmting bind with: ", bindDN);
  console.log("USERNAME: ", username);
  console.log("PASS: ", password);

  try {
    await client.bind(bindDN, password);

    const searchResult = await client.search(bindDN, {
      filter: `(sAMAccountName=${username})`,
      scope: "base",
      attributes: ["cn", "givenName", "sn", "mail", "displayName"],
    });

    const userEntry = searchResult.searchEntries[0];

    if (!userEntry) {
      throw new Error("USER_NOT_FOUND");
    }

    const givenName = getLdapString(userEntry.givenName);
    const sn = getLdapString(userEntry.sn);
    const cn = getLdapString(userEntry.cn);
    const mail = getLdapString(userEntry.mail);
    const displayNameAttr = getLdapString(userEntry.displayName);

    let displayName = username;

    if (givenName) {
      displayName = givenName;
    } else if (cn) {
      displayName = cn;
    } else if (displayNameAttr && sn) {
      displayName = `${displayNameAttr} ${sn}`;
    }

    // Return plain object — TypeScript will infer type
    return {
      displayName,
      givenName,
      sn,
      cn,
      mail,
    };
  } catch (error) {
    console.error("LDAP auth failed:", error);
    throw new Error("INVALID_CREDENTIALS");
  } finally {
    try {
      await client.unbind();
    } catch (unbindError) {
      console.warn("LDAP unbind failed:", unbindError);
    }
  }
};
