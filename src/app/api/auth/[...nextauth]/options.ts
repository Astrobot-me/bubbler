import NextAuth from "next-auth";

import { authOption } from "./route";

const handler = NextAuth(authOption)

export { handler as GET , handler as POST}


