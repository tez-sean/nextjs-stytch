"use client";

import { useStytchB2BClient, useStytchMember } from "@stytch/nextjs/b2b";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const MAGIC_LINKS_TOKEN = "multi_tenant_magic_links";

/**
 * During both the Magic link and OAuth flows, Stytch will redirect the user back to your application to a specified redirect URL (see Login.tsx).
 * Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow.
 * A redirect URL for this example app will look something like: http://localhost:3000/authenticate?stytch_token_type=magic_links&token=abc123
 *
 * The AuthenticatePage will detect the presence of a token in the query parameters, and attempt to authenticate it.
 *
 * On successful authentication, a session will be created and the user will be redirect to /profile.
 */
const AdminCallbackComponent = () => {
  const { member: user, isInitialized } = useStytchMember();
  const searchParams = useSearchParams();
  const stytch = useStytchB2BClient();
  const router = useRouter();

  const token = searchParams.get("token");
  const stytch_token_type = searchParams.get("stytch_token_type");

  console.log(`${token}::${stytch_token_type}`);

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      if (token && stytch_token_type === MAGIC_LINKS_TOKEN) {
        stytch.magicLinks.authenticate({
          magic_links_token: token,
          session_duration_minutes: 60,
        });
      } else console.log(`STYTCH_TOKEN_TYPE: ${stytch_token_type}`);
    }
  }, [isInitialized, router, stytch, user, token, stytch_token_type]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (user) {
      router.replace("/admin/dashboard");
    }
  }, [router, user, isInitialized]);

  return null;
};

export default AdminCallbackComponent;
