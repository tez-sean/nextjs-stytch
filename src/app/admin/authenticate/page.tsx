"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useStytchB2BClient, useStytchMember } from "@stytch/nextjs/b2b";

/**
 *
 * This should only be handling MagicLink/Password logins. It will render
 * a blank screen, otherwise.
 *
 */
const Authenticate = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const router = useRouter();
  const stytch = useStytchB2BClient();
  const { member, isInitialized } = useStytchMember();

  useEffect(() => {
    if (stytch && isInitialized && !member) {
      const token = searchParams.token;
      const tokenType = searchParams.stytch_token_type;

      if (token && tokenType === "multi_tenant_magic_links")
        stytch.magicLinks.authenticate({
          magic_links_token: token,
          session_duration_minutes: 60,
        });

      console.log(`TOKEN_TYPE:: ${tokenType}`);
    }
  }, [stytch, member, isInitialized, router, searchParams]);

  // Redirects the user once initialized (or if already signed in)
  useEffect(() => {
    if (!isInitialized) return;

    if (member) router.replace("/admin/dashboard");
  }, [isInitialized, member, router]);

  // This component contains no UI (maybe a full screen 'Authenticating...' message/spinner)
  return null;
};
export default Authenticate;
