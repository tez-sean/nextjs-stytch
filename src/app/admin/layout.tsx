"use client";

import * as Constants from "@/constants";
import { StytchB2BProvider } from "@stytch/nextjs/b2b";
import { createStytchB2BUIClient } from "@stytch/nextjs/b2b/ui";

const stytch = createStytchB2BUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN ?? "",
  {
    cookieOptions: {
      jwtCookieName: Constants.STYTCH_JWT_COOKIE_NAME,
      opaqueTokenCookieName: Constants.STYTCH_TOKEN_COOKIE_NAME,
      domain: "acme.com",
      availableToSubdomains: true,
      path: "/",
    },
  }
);

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StytchB2BProvider stytch={stytch}>
      <main className="h-fit bg-blue-400">{children}</main>
    </StytchB2BProvider>
  );
}
