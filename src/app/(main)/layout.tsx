"use client";

import * as Constants from "@/constants";
import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_CONSUMER_TOKEN ?? "",
  {
    cookieOptions: {
      jwtCookieName: Constants.STYTCH_B2C_JWT_COOKIE,
      opaqueTokenCookieName: Constants.STYTCH_B2C_SESSION_COOKIE,
    },
  }
);

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StytchProvider stytch={stytch}>
      <main className="h-full bg-gray-100">{children}</main>
    </StytchProvider>
  );
}
