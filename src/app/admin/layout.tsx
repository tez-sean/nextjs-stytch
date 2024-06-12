"use client";

import * as Constants from "@/constants";
import { StytchB2BProvider } from "@stytch/nextjs/b2b";
import { createStytchB2BUIClient } from "@stytch/nextjs/b2b/ui";

const stytch = createStytchB2BUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN ?? "",
  {
    cookieOptions: {
      jwtCookieName: Constants.STYTCH_B2B_JWT_COOKIE,
      opaqueTokenCookieName: Constants.STYTCH_B2B_SESSION_COOKIE,
      domain: process.env.NEXT_PUBLIC_STYTCH_COOKIE_DOMAIN_NAME,
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
      <main className="h-fit bg-gray-100">{children}</main>
    </StytchB2BProvider>
  );
}
