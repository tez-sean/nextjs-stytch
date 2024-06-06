"use client";

import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_CONSUMER_TOKEN ?? "",
  {
    cookieOptions: {
      jwtCookieName: `stytch_session_jwt_next_b2c_app`,
      opaqueTokenCookieName: `stytch_session_next_b2c_app`,
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
      <main className="h-full">{children}</main>
    </StytchProvider>
  );
}
