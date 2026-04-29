import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface User {
    id?: string;
    token?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: string;
  }
  interface Session {
    user: {
      id?: string;
      firstName: string;
      lastName: string;
      email?: string;
      image?: string;
      token?: string;
    };
  }
}

export const jwtCallback = async ({
  token,
  user,
}: {
  token: JWT;
  user?: User | AdapterUser;
}): Promise<JWT> => {
  if (user) {
    token.id = user.id;
    token.token = user.token;
    token.firstName = user.firstName;
    token.lastName = user.lastName;
    token.email = user.email;
  }
  return token;
};

export const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  if (session.user) {
    session.user.id = token.id as string;
    session.user.token = token.token as string;
    session.user.firstName = token.firstName as string;
    session.user.lastName = token.lastName as string;
    session.user.email = token.email as string;
    session.user.image = token.picture as string;
  }
  return session;
};
