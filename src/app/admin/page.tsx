"use client";

import { StytchB2B } from "@stytch/nextjs/b2b";
import {
  AuthFlowType,
  B2BProducts,
  StytchB2BUIConfig,
  StytchEventType,
} from "@stytch/vanilla-js";
import { useRouter } from "next/navigation";

import * as utils from "@/lib/utils";

const AdminHome = () => {
  const router = useRouter();
  const redirectUrl = `${utils.getDomainFromWindow()}/admin/authenticate`;

  const config: StytchB2BUIConfig = {
    authFlowType: AuthFlowType.Organization,
    products: [B2BProducts.emailMagicLinks, B2BProducts.passwords],
    emailMagicLinksOptions: {
      loginRedirectURL: redirectUrl,
      signupRedirectURL: redirectUrl,
    },
    passwordOptions: {
      loginRedirectURL: redirectUrl,
      resetPasswordRedirectURL: redirectUrl,
    },
    sessionOptions: {
      sessionDurationMinutes: 60,
    },
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>Admin Home</div>

      <StytchB2B
        config={config}
        callbacks={{
          onEvent: async ({ type, data }) => {
            if (
              type === StytchEventType.B2BMagicLinkAuthenticate ||
              type === StytchEventType.B2BPasswordAuthenticate
            )
              router.push("/admin/dashboard");
          },
        }}
      />
    </div>
  );
};

export default AdminHome;
