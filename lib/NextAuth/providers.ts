import CredentialsProvider from "next-auth/providers/credentials";

const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-in`,
      {
        method: "POST",
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(res);
    const user = await res.json();
    console.log(res);
    console.log(user);
    if (res.ok && user) {
      return {
        ...user.data,
        token: user.token,
        role: user.data.role,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        image: user.data.image,
      };
    }
    return null;
  },
});
const providers = [credentialsProvider];
export default providers;
