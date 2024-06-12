import * as Constants from "@/constants";
import { NextRequest, NextResponse } from "next/server";

// Server side redirects require the FULL path (protocol+domain)
const redirectToPath = (req: NextRequest, pathname: string): NextResponse => {
  const url = req.nextUrl.clone();
  url.pathname = pathname;

  return NextResponse.redirect(url);
};

export const middleware = (request: NextRequest) => {
  // If no auth cookie, send to login page (based on path requested)
  if (
    !request.cookies.has(Constants.STYTCH_B2B_JWT_COOKIE) &&
    !request.cookies.has(Constants.STYTCH_B2C_JWT_COOKIE)
  )
    return request.nextUrl.pathname.startsWith("/admin")
      ? redirectToPath(request, "/admin")
      : redirectToPath(request, "/login");

  // If b2b/internal user
  if (request.cookies.has(Constants.STYTCH_B2B_JWT_COOKIE)) {
    const token = request.cookies.get(Constants.STYTCH_B2B_JWT_COOKIE)?.value;

    // TODO: Validate token!!
    if (!token) return redirectToPath(request, "/admin");
  } else {
    const token = request.cookies.get(Constants.STYTCH_B2C_JWT_COOKIE)?.value;

    // TODO: Validate token!!
    if (!token) return redirectToPath(request, "/login");
  }

  // const roles: string[] =
  //   decoded[Constants.STYTCH_CLAIMS_ROLES]?.roles?.map((role: string) =>
  //     role.toLowerCase()
  //   ) || [];
  // if (!roles.includes("stytch_admin")) return redirectToPath(request, "/admin");
};

export const config = {
  matcher: ["/admin/dashboard", "/profile"],
};
