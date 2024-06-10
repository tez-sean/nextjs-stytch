import * as Constants from "@/constants";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// Server side redirects require the FULL path (protocol+domain)
const redirectToPath = (req: NextRequest, pathname: string): NextResponse => {
  const url = req.nextUrl.clone();
  url.pathname = pathname;

  return NextResponse.redirect(url);
};

export const middleware = (request: NextRequest) => {
  const token: string = request.cookies.get(Constants.STYTCH_JWT_COOKIE_NAME)
    ?.value!;

  if (!token && request.nextUrl.pathname.startsWith("/admin"))
    return NextResponse.redirect("/admin");

  const decoded: JwtPayload = jwt.decode(token) as JwtPayload;
  if (!decoded) return redirectToPath(request, "/admin");

  // const roles: string[] =
  //   decoded[Constants.STYTCH_CLAIMS_ROLES]?.roles?.map((role: string) =>
  //     role.toLowerCase()
  //   ) || [];
  // if (!roles.includes("stytch_admin")) return redirectToPath(request, "/admin");
};

export const config = {
  matcher: ["/admin/dashboard"],
};
